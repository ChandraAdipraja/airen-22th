import { useEffect, useRef } from "react";
import { Fireworks } from "fireworks-js";

export default function FireworksBackground({ run = false }) {
  const containerRef = useRef(null);
  const fwRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // inisialisasi sekali saja
    if (!fwRef.current) {
      fwRef.current = new Fireworks(containerRef.current, {
        autoresize: true,
        opacity: 0.5,
        // bikin gerakan lebih pelan & jarang
        acceleration: 1.01,
        friction: 0.98,
        gravity: 1.3,
        particles: 45,
        traceLength: 2,
        traceSpeed: 5,
        explosion: 4,
        intensity: 18, // <— rate roket
        flickering: 35,
        lineStyle: "round",
        hue: { min: 0, max: 360 },
        delay: { min: 40, max: 90 }, // <— jeda antar ledakan (lebih besar = lebih pelan)
        rocketsPoint: { min: 20, max: 80 },
      });
    }

    if (run) {
      fwRef.current.start();
    } else {
      fwRef.current.stop();
      fwRef.current.clear();
    }

    return () => {
      // kalau scene dibuang, matikan
      fwRef.current?.stop();
      fwRef.current?.clear();
    };
  }, [run]);

  return (
    <div
      ref={containerRef}
      className="
        fixed inset-0
        w-screen h-screen
        pointer-events-none
        z-1
      "
      // geser sedikit ke atas biar lebih dekat ke teks
      style={{ transform: "translateY(-50)" }}
    />
  );
}
