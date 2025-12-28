import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import FireworksBackground from "../components/FireworksBackground";
import { desc } from "framer-motion/client";

export default function EndingScene({ isActive, name = "Airen" }) {
  const titleRef = useRef(null);
  const andRef = useRef(null);
  const newYearRef = useRef(null);
  const descRef = useRef(null);

  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setShowFireworks(false);
      return;
    }

    gsap.set(
      [titleRef.current, andRef.current, newYearRef.current, descRef.current],
      {
        autoAlpha: 0,
        y: 20,
      }
    );

    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(titleRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
    })
      .to(
        andRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "+=0.2"
      )
      .to(
        newYearRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        "+=0.15"
      )
      .to(
        descRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        "+=0.15"
      )
      .add(() => {
        setShowFireworks(true);
      });

    return () => {
      tl.kill();
      setShowFireworks(false);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 z-9999">
      {/* background dasar */}
      <div className="absolute inset-0 bg-[#020014]" />
      <div className="absolute inset-0 bg-black/40" />

      {/* 🎆 fireworks jalan hanya ketika showFireworks = true */}
      <FireworksBackground run={showFireworks} />

      {/* TEKS DI DEPAN */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div
            ref={titleRef}
            className="text-3xl sm:text-5xl font-extrabold text-white leading-tight"
          >
            Selamat Ulang Tahun <span className="text-pink-300">{name}</span>
          </div>

          <div
            ref={andRef}
            className="text-xl sm:text-2xl font-semibold text-white/85"
          >
            &
          </div>

          <div
            ref={newYearRef}
            className="text-2xl sm:text-4xl font-bold text-white/90 tracking-wide"
          >
            Happy New Year 🎆
          </div>

          <p
            className="max-w-md mx-auto text-sm sm:text-base text-white/70 mt-4"
            ref={descRef}
          >
            Semoga tahun ini penuh hal-hal yang bikin kamu merasa cukup,
            dicintai, dan tetap hangat… bahkan di hari yang sepi sekalipun ✨
          </p>
        </div>
      </div>
    </div>
  );
}
