import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { AudioProvider } from "@/context/AudioContext";

export const metadata: Metadata = {
  title: "Soumyadip Sen | Portfolio",
  description: "Personal portfolio of Soumyadip Sen - Software Engineer & Creative Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Special+Elite&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#0a0a0c] text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white">
        <AudioProvider>
          <CustomCursor />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
