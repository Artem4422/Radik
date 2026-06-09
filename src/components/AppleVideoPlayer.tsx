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
  const [durationText, setDurationText] = useState("0:00");
  const [muted, setMuted] = useState(false);

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
    const onLoadedMetadata = () => {
      setDurationText(formatTime(video.duration || 0));
      setTime(formatTime(video.currentTime || 0));
    };
    const onVolumeChange = () => setMuted(video.muted || video.volume === 0);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("volumechange", onVolumeChange);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("volumechange", onVolumeChange);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => undefined);
    else video.pause();
  };

  const handlePlayerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest(".video-controls") || target.closest(".center-play-btn")) return;
    togglePlay();
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const bar = e.currentTarget;
    if (!video?.duration) return;
    const rect = bar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const timeLabel = `${time} / ${durationText}`;

  return (
    <div
      ref={playerRef}
      className={`apple-video-player animate-in${revealed ? " reveal" : ""}${playing ? " playing" : ""} ${className}`.trim()}
      onClick={handlePlayerClick}
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
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
      <div className="video-controls" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="control-btn play-pause-btn" onClick={togglePlay} aria-label="Play/Pause">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            {playing ? (
              <>
                <rect x="6" y="5" width="4" height="14" rx="0.5" />
                <rect x="14" y="5" width="4" height="14" rx="0.5" />
              </>
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>
        </button>
        <span className="time-display time-display--primary">{timeLabel}</span>
        <div className="progress-container" onClick={seek} role="presentation">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <span className="time-display time-display--secondary">{timeLabel}</span>
        <button type="button" className="control-btn volume-btn" onClick={toggleMute} aria-label={muted ? "Включить звук" : "Выключить звук"}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            {muted ? (
              <>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </>
            ) : (
              <>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </>
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}
