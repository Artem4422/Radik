import { useEffect, useRef, useState } from "react";

type AppleVideoPlayerProps = {
  src: string;
  poster?: string;
  className?: string;
};

const PLAY_ICON = "M8 5v14l11-7z";
const PAUSE_ICON = "M6 19h4V5H6v14zm8-14v14h4V5h-4z";

const VOLUME_ICON_FULL =
  "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z";
const VOLUME_ICON_LOW =
  "M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z";
const VOLUME_ICON_MUTED =
  "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

function volumeIcon(level: number) {
  if (level === 0) return VOLUME_ICON_MUTED;
  if (level < 0.5) return VOLUME_ICON_LOW;
  return VOLUME_ICON_FULL;
}

function isFullscreenActive() {
  return Boolean(
    document.fullscreenElement ||
      (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement ||
      (document as Document & { mozFullScreenElement?: Element }).mozFullScreenElement ||
      (document as Document & { msFullscreenElement?: Element }).msFullscreenElement,
  );
}

export function AppleVideoPlayer({ src, poster, className = "" }: AppleVideoPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastVolumeRef = useRef(1);
  const [playing, setPlaying] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState("0:00");
  const [volume, setVolume] = useState(1);
  const [volumeIconPath, setVolumeIconPath] = useState(VOLUME_ICON_FULL);
  const [fullscreen, setFullscreen] = useState(false);

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
    const onEnded = () => setPlaying(false);
    const onVolumeChange = () => {
      setVolume(video.volume);
      setVolumeIconPath(volumeIcon(video.volume));
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    video.addEventListener("volumechange", onVolumeChange);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("volumechange", onVolumeChange);
    };
  }, []);

  useEffect(() => {
    const updateFs = () => setFullscreen(isFullscreenActive());
    document.addEventListener("fullscreenchange", updateFs);
    document.addEventListener("webkitfullscreenchange", updateFs);
    document.addEventListener("msfullscreenchange", updateFs);
    return () => {
      document.removeEventListener("fullscreenchange", updateFs);
      document.removeEventListener("webkitfullscreenchange", updateFs);
      document.removeEventListener("msfullscreenchange", updateFs);
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
    if (!video?.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  const applyVolume = (level: number) => {
    const video = videoRef.current;
    if (!video) return;
    const next = Math.max(0, Math.min(1, level));
    video.volume = next;
    setVolume(next);
    setVolumeIconPath(volumeIcon(next));
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.volume > 0) {
      lastVolumeRef.current = video.volume;
      applyVolume(0);
    } else {
      applyVolume(lastVolumeRef.current || 1);
    }
  };

  const setVolumeFromEvent = (e: MouseEvent | TouchEvent, slider: HTMLElement) => {
    const video = videoRef.current;
    if (!video) return;
    const clientY =
      "touches" in e && e.touches.length > 0
        ? e.touches[0].clientY
        : "changedTouches" in e && e.changedTouches.length > 0
          ? e.changedTouches[0].clientY
          : (e as MouseEvent).clientY;
    const rect = slider.getBoundingClientRect();
    const level = Math.max(0, Math.min(1, (rect.bottom - clientY) / rect.height));
    applyVolume(level);
  };

  const startVolumeDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const slider = e.currentTarget;
    if (e.cancelable) e.preventDefault();
    setVolumeFromEvent(e.nativeEvent, slider);

    const isTouch = "touches" in e.nativeEvent;
    const moveEvent = isTouch ? "touchmove" : "mousemove";
    const upEvent = isTouch ? "touchend" : "mouseup";

    const onMove = (moveE: Event) => {
      if (moveE.cancelable) moveE.preventDefault();
      setVolumeFromEvent(moveE as MouseEvent | TouchEvent, slider);
    };
    const onUp = () => {
      document.removeEventListener(moveEvent, onMove);
      document.removeEventListener(upEvent, onUp);
    };

    document.addEventListener(moveEvent, onMove, { passive: false });
    document.addEventListener(upEvent, onUp);
  };

  const toggleFullscreen = () => {
    const player = playerRef.current;
    const video = videoRef.current;
    if (!player || !video) return;

    if (!isFullscreenActive()) {
      const v = video as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
      if (v.webkitEnterFullscreen) {
        v.webkitEnterFullscreen();
      } else if (player.requestFullscreen) {
        void player.requestFullscreen();
      } else {
        const p = player as HTMLDivElement & {
          webkitRequestFullscreen?: () => void;
          msRequestFullscreen?: () => void;
        };
        p.webkitRequestFullscreen?.();
        p.msRequestFullscreen?.();
      }
    } else if (document.exitFullscreen) {
      void document.exitFullscreen();
    } else {
      const doc = document as Document & {
        webkitExitFullscreen?: () => void;
        msExitFullscreen?: () => void;
      };
      doc.webkitExitFullscreen?.();
      doc.msExitFullscreen?.();
    }
  };

  return (
    <div
      ref={playerRef}
      className={`apple-video-player animate-in${revealed ? " reveal" : ""}${playing ? " playing" : ""} ${className}`.trim()}
    >
      <video
        ref={videoRef}
        preload="metadata"
        playsInline
        poster={poster}
        onClick={togglePlay}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button type="button" className="center-play-btn" onClick={togglePlay} aria-label="Play">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="white" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
      <div className="video-controls" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="play-pause-btn" onClick={togglePlay} aria-label="Play/Pause">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
            <path d={playing ? PAUSE_ICON : PLAY_ICON} className="play-icon-path" />
          </svg>
        </button>
        <div className="progress-container" onClick={seek} role="presentation">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="time-display">{time}</div>
        <div className="volume-control">
          <div className="volume-slider-container">
            <div
              className="volume-slider"
              onMouseDown={startVolumeDrag}
              onTouchStart={startVolumeDrag}
              role="presentation"
            >
              <div className="volume-level" style={{ height: `${volume * 100}%` }} />
            </div>
          </div>
          <button type="button" className="volume-btn" onClick={toggleMute} aria-label="Громкость">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
              <path d={volumeIconPath} className="volume-icon-path" />
            </svg>
          </button>
        </div>
        <button type="button" className="fullscreen-btn" onClick={toggleFullscreen} aria-label="Полный экран">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden>
            {fullscreen ? (
              <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-3v2h5v5h-2V8z" />
            ) : (
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}
