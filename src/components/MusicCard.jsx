import { useState } from "react";

export default function MusicCard({
  gifSrc,
  title,
  playingText = "is playing",
  audioRef,
}) {
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    const a = audioRef?.current;
    if (!a) return;

    if (a.paused) {
      a.play();
      setIsPaused(false);
    } else {
      a.pause();
      setIsPaused(true);
    }
  };

  const toggleMute = () => {
    const a = audioRef?.current;
    if (!a) return;

    a.muted = !a.muted;
    setIsMuted(a.muted);
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <img
            src={gifSrc}
            alt="Music"
            className="w-12 h-12 rounded-xl object-cover"
          />

          <div>
            <div className="text-sm font-semibold text-white">{title}</div>
            <div className="text-xs text-white/70">{playingText}</div>
          </div>
        </div>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-9 h-9 flex items-center justify-center rounded-full
                       border border-white/15 bg-white/5
                       hover:bg-white/10 transition"
            aria-label="Play / Pause"
          >
            {isPaused ? "▶️" : "⏸️"}
          </button>

          <button
            onClick={toggleMute}
            className="w-9 h-9 flex items-center justify-center rounded-full
                       border border-white/15 bg-white/5
                       hover:bg-white/10 transition"
            aria-label="Mute / Unmute"
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>
    </div>
  );
}
