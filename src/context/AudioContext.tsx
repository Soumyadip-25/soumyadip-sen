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

  // Check if device is mobile
  const checkIsMobile = useCallback(() => {
    if (typeof window === "undefined") return false;
    return (
      window.innerWidth < 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }, []);

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

  // Initialize and handle automatic playback
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = DEFAULT_VOLUME;
    audioRef.current = audio;

    const isMobile = checkIsMobile();

    // On mobile devices: Muted/off by default per user requirement
    if (isMobile) {
      setIsPlaying(false);
      return () => {
        audio.pause();
        audio.src = "";
      };
    }

    // On desktop: Automatic playback when someone enters the platform
    let cleanedUp = false;

    const tryAutoPlay = () => {
      if (userManuallyPausedRef.current || cleanedUp) return;
      const promise = audio.play();
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
            // Attach one-time listener to start on the very first user interaction
            const handleFirstInteraction = () => {
              if (cleanedUp || userManuallyPausedRef.current) return;
              audio
                .play()
                .then(() => {
                  if (!cleanedUp && !userManuallyPausedRef.current) {
                    setIsPlaying(true);
                    fadeIn(DEFAULT_VOLUME, 1000);
                  }
                })
                .catch(() => {});
              cleanupListeners();
            };

            const cleanupListeners = () => {
              window.removeEventListener("pointerdown", handleFirstInteraction);
              window.removeEventListener("click", handleFirstInteraction);
              window.removeEventListener("keydown", handleFirstInteraction);
              window.removeEventListener("scroll", handleFirstInteraction);
            };

            window.addEventListener("pointerdown", handleFirstInteraction, {
              once: true,
            });
            window.addEventListener("click", handleFirstInteraction, {
              once: true,
            });
            window.addEventListener("keydown", handleFirstInteraction, {
              once: true,
            });
            window.addEventListener("scroll", handleFirstInteraction, {
              once: true,
            });
          });
      }
    };

    tryAutoPlay();

    return () => {
      cleanedUp = true;
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.pause();
      audio.src = "";
    };
  }, [checkIsMobile, fadeIn]);

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

