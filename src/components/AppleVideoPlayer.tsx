import { useEffect, useRef, useState } from "react";

type AppleVideoPlayerProps = {
  src: string;
  poster?: string;
  className?: string;
};

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export function AppleVideoPlayer({ src, poster, className = "" }: AppleVideoPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState("0:00");

  useEffect(() => {
    const timer = window.setTimeout(() => setRevealed(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => {
      document.querySelectorAll(".apple-video-player video").forEach((v) => {
        if (v !== video) (v as HTMLVideoElement).pause();
      });
      setPlaying(true);
    };
    const onPause = () => setPlaying(false);
    const onTimeUpdate = () => {
      if (!video.duration) return;
      setProgress((video.currentTime / video.duration) * 100);
      setTime(formatTime(video.currentTime));
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => undefined);
    else video.pause();
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const bar = e.currentTarget;
    if (!video?.duration) return;
    const rect = bar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  const toggleFullscreen = () => {
    const player = playerRef.current;
    const video = videoRef.current;
    if (!player || !video) return;
    const fs = document.fullscreenElement;
    if (!fs) {
      const v = video as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
      if (v.webkitEnterFullscreen) {
        v.webkitEnterFullscreen();
      } else {
        void player.requestFullscreen?.();
      }
    } else {
      void document.exitFullscreen?.();
    }
  };

  return (
    <div
      ref={playerRef}
      className={`apple-video-player animate-in${revealed ? " reveal" : ""}${playing ? " playing" : ""} ${className}`.trim()}
    >
      <video
        ref={videoRef}
        preload="none"
        playsInline
        poster={poster}
        className={playing ? "is-playing" : "is-idle"}
      >
        <source src={src} type="video/mp4" />
      </video>
      {poster && !playing && (
        <img src={poster} alt="" className="video-poster" aria-hidden draggable={false} />
      )}
      <button type="button" className="center-play-btn" onClick={togglePlay} aria-label="Play">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
      <div className="video-controls">
        <button type="button" className="control-btn play-pause-btn" onClick={togglePlay} aria-label="Play/Pause">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            {playing ? (
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>
        </button>
        <div className="progress-container" onClick={seek} role="presentation">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <span className="time-display">{time}</span>
        <button type="button" className="control-btn fullscreen-btn" onClick={toggleFullscreen} aria-label="Fullscreen">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
