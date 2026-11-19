"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  volume: number;
  setVolume: (vol: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const DEFAULT_VOLUME = 0.12; // 12% (within user specification of 10-15%)
const AUDIO_SRC = "/audio/bgm.mp3";

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(DEFAULT_VOLUME);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const userManuallyPausedRef = useRef<boolean>(false);

  // Smooth fade-in helper
  const fadeIn = useCallback((targetVol = DEFAULT_VOLUME, durationMs = 800) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const audio = audioRef.current;
    audio.volume = 0;
    const steps = 20;
    const stepTime = durationMs / steps;
    const volIncrement = targetVol / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      if (!audioRef.current) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        return;
      }
      const nextVol = Math.min(volIncrement * currentStep, targetVol);
      audioRef.current.volume = nextVol;

      if (currentStep >= steps) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    }, stepTime);
  }, []);

  // Smooth fade-out helper
  const fadeOut = useCallback((durationMs = 400): Promise<void> => {
    return new Promise((resolve) => {
      if (!audioRef.current) {
        resolve();
        return;
      }
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

      const audio = audioRef.current;
      const initialVol = audio.volume;
      const steps = 15;
      const stepTime = durationMs / steps;
      const volDecrement = initialVol / steps;
      let currentStep = 0;

      fadeIntervalRef.current = setInterval(() => {
        currentStep++;
        if (!audioRef.current) {
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          resolve();
          return;
        }
        const nextVol = Math.max(initialVol - volDecrement * currentStep, 0);
        audioRef.current.volume = nextVol;

        if (currentStep >= steps) {
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
          audioRef.current.pause();
          resolve();
        }
      }, stepTime);
    });
  }, []);

  // Explicit Play action
  const play = useCallback(() => {
    userManuallyPausedRef.current = false;
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        fadeIn(DEFAULT_VOLUME, 600);
      })
      .catch(() => {
        // Handled silently
      });
  }, [fadeIn]);

  // Explicit Pause action
  const pause = useCallback(() => {
    userManuallyPausedRef.current = true;
    fadeOut(350).then(() => {
      setIsPlaying(false);
    });
  }, [fadeOut]);

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  // Set explicit volume
  const setVolume = useCallback((newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  }, []);

  // Initialize and handle automatic playback across desktop and mobile
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0; // Starts at 0 and fades in smoothly
    audioRef.current = audio;

    let cleanedUp = false;
    let interactionListenersAttached = false;

    const startAudioPlayback = () => {
      if (cleanedUp || userManuallyPausedRef.current || !audioRef.current) return;

      const promise = audioRef.current.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            if (!cleanedUp && !userManuallyPausedRef.current) {
              setIsPlaying(true);
              fadeIn(DEFAULT_VOLUME, 1000);
            }
          })
          .catch(() => {
            // Browser autoplay policy blocked unprompted audio;
            // Attach interaction listeners to start on very first user gesture anywhere on page
            attachInteractionListeners();
          });
      }
    };

    const handleFirstInteraction = () => {
      cleanupInteractionListeners();
      startAudioPlayback();
    };

    const attachInteractionListeners = () => {
      if (interactionListenersAttached || cleanedUp) return;
      interactionListenersAttached = true;

      const events = [
        "click",
        "pointerdown",
        "touchstart",
        "touchend",
        "keydown",
        "wheel",
        "scroll",
      ];

      events.forEach((evt) => {
        window.addEventListener(evt, handleFirstInteraction, {
          once: true,
          capture: true,
          passive: true,
        });
        document.addEventListener(evt, handleFirstInteraction, {
          once: true,
          capture: true,
          passive: true,
        });
      });
    };

    const cleanupInteractionListeners = () => {
      interactionListenersAttached = false;
      const events = [
        "click",
        "pointerdown",
        "touchstart",
        "touchend",
        "keydown",
        "wheel",
        "scroll",
      ];

      events.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction, { capture: true } as EventListenerOptions);
        document.removeEventListener(evt, handleFirstInteraction, { capture: true } as EventListenerOptions);
      });
    };

    // Attempt automatic playback on initial visit
    startAudioPlayback();

    return () => {
      cleanedUp = true;
      cleanupInteractionListeners();
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.pause();
      audio.src = "";
    };
  }, [fadeIn]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        togglePlay,
        play,
        pause,
        volume,
        setVolume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}

