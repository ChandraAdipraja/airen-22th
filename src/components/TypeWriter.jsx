import { useEffect, useRef, useState } from "react";

export default function Typewriter({
  text = "",
  speed = 75, // makin besar makin lambat
  startDelay = 800,
  onDone,
  className = "",
  scrollRef,
}) {
  const [out, setOut] = useState("");
  const indexRef = useRef(0);
  const runIdRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // setiap kali text berubah -> sesi baru
    runIdRef.current += 1;
    const myRunId = runIdRef.current;

    // reset output
    indexRef.current = 0;
    setOut("");

    // bersihin timeout sebelumnya (kalau ada)
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const tick = () => {
      // kalau sesi sudah diganti / component unmount, stop
      if (runIdRef.current !== myRunId) return;

      indexRef.current += 1;
      const next = text.slice(0, indexRef.current);
      setOut(next);

      // auto-scroll ikut ke bawah
      if (scrollRef?.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }

      if (indexRef.current < text.length) {
        timeoutRef.current = setTimeout(tick, speed);
      } else {
        onDone?.();
      }
    };

    // delay sebelum mulai
    timeoutRef.current = setTimeout(() => {
      if (runIdRef.current !== myRunId) return;
      tick();
    }, startDelay);

    return () => {
      // invalidate sesi ini (penting untuk StrictMode)
      // runId akan bertambah saat effect run lagi
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, startDelay]); // ✅ re-render biasa gak restart karena deps gak berubah

  return (
    <p className={className}>
      {out}
      <span className="inline-block w-[8px] animate-pulse">▍</span>
    </p>
  );
}
