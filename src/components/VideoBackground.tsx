import { useEffect, useRef } from "react";
import { usePreloader } from "@/context/PreloaderContext";

type VideoBackgroundProps = {
  src: string;
  className?: string;
  waitForSplash?: boolean;
};

export function VideoBackground({
  src,
  className = "page-bg",
  waitForSplash = false,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isLoading } = usePreloader();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.volume = 0;
    if (waitForSplash && isLoading) return;

    void video.play().catch(() => undefined);
  }, [isLoading, waitForSplash]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay={!waitForSplash}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export function PhotoBackground({
  src,
  overlayOpacity = 0.55,
}: {
  src?: string;
  overlayOpacity?: number;
}) {
  return (
    <>
      <div
        className="page-bg page-bg--photo"
        style={
          src
            ? { backgroundImage: `url(${src})` }
            : { backgroundColor: "var(--bg-color)" }
        }
        aria-hidden
      />
      <div
        className="page-overlay"
        style={{ background: `rgba(0, 0, 0, ${overlayOpacity})` }}
        aria-hidden
      />
    </>
  );
}
