import { useRef, useEffect, useState } from "react";

interface HeroVideoProps {
  src: string;
  className?: string;
  poster?: string;
}

/**
 * Hero Video Component
 * Displays an autoplay, looping video background (muted, no controls)
 * Similar to veneer/medical websites that showcase their work
 * Features: autoplay, loop, muted, playsInline (for mobile)
 * Optimized for mobile: uses metadata preload and better error handling
 */
export const HeroVideo = ({ src, className = "", poster }: HeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video plays when loaded
    const handleLoadedData = () => {
      video.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Video autoplay prevented:", error);
          // On mobile, user interaction might be required
        });
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      console.log("Video loading error");
      setIsPlaying(false);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("error", handleError);

    // Try to play on mount
    video.play().catch((error) => {
      console.log("Video autoplay prevented on mount:", error);
    });

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-full">
      <video
        ref={videoRef}
        className={`${className} absolute top-0 left-0 w-full h-full`}
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        preload={isMobile ? "metadata" : "auto"}
        aria-label="Hero video presentation"
        style={{ 
          objectFit: "cover",
          objectPosition: "center",
          minWidth: "100%",
          minHeight: "100%",
        }}
      >
        <source src={src} type="video/quicktime" />
        <source src={src} type="video/mp4" />
        {/* Fallback message for browsers that don't support video */}
        <p>Votre navigateur ne supporte pas la lecture de vidéos.</p>
      </video>
      {/* Optional: Loading indicator - smaller on mobile */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className={`${isMobile ? 'w-12 h-12 border-3' : 'w-16 h-16 border-4'} border-white/30 border-t-white rounded-full animate-spin`}></div>
        </div>
      )}
    </div>
  );
};
