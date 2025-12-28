import { useRef } from "react";

export default function useAudioPlayer(
  src,
  { volume = 0.6, loop = true } = {}
) {
  const audioRef = useRef(null);

  const play = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      a.volume = volume;
      a.loop = loop;
      if (a.src !== window.location.origin + src) {
        // src set by JSX anyway; keep simple
      }
      await a.play();
    } catch {
      // autoplay bisa ditolak; nanti bisa tambah tombol manual play
    }
  };

  const pause = () => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
  };

  return { audioRef, play, pause };
}
