import { useEffect, useRef } from "react";
import gsap from "gsap";
import MusicCard from "../components/MusicCard";

export default function BirthdayScene({ isActive, name, audioRef, onWish }) {
  const headlineRef = useRef(null); // typewriter kecil
  const d1Ref = useRef(null);
  const d2Ref = useRef(null);

  const musicWrapRef = useRef(null);
  const cardWrapRef = useRef(null);

  const msgRef = useRef(null); // message typewriter
  const wishBtnWrapRef = useRef(null); // tombol wrapper

  // digit random -> settle
  const rollTo = (el, finalDigit, duration = 1.2) => {
    if (!el) return gsap.timeline();
    const obj = { t: 0 };
    return gsap.to(obj, {
      t: 1,
      duration,
      ease: "none",
      onUpdate: () => {
        el.textContent = String(Math.floor(Math.random() * 10));
      },
      onComplete: () => {
        el.textContent = String(finalDigit);
      },
    });
  };

  // typewriter (GSAP) — aman, stabil
  const typeText = (tl, el, text, { speed = 0.06 } = {}) => {
    if (!el) return tl;
    el.textContent = "";
    const state = { i: 0 };
    return tl.to(state, {
      i: text.length,
      duration: text.length * speed,
      ease: "none",
      onUpdate: () => {
        el.textContent = text.slice(0, Math.floor(state.i));
      },
    });
  };

  // backspace step-by-step (pakai string sumber, bukan DOM)
  const backspacePerChar = (tl, el, startText, { step = 0.08 } = {}) => {
    if (!el) return tl;
    for (let i = startText.length; i >= 0; i--) {
      tl.to(
        {},
        {
          duration: step,
          onStart: () => {
            el.textContent = startText.slice(0, i);
          },
        }
      );
    }
    return tl;
  };

  const handleWishClick = () => {
    const tl = gsap.timeline({
      defaults: { duration: 0.85, ease: "power3.inOut" },
      onComplete: onWish,
    });

    tl.to(musicWrapRef.current, { yPercent: -140, autoAlpha: 0 }, 0).to(
      cardWrapRef.current,
      { yPercent: 140, autoAlpha: 0 },
      0.05
    );
  };

  useEffect(() => {
    if (!isActive) return;

    // ===== reset awal (anti glitch) =====
    if (headlineRef.current) headlineRef.current.textContent = "";
    if (d1Ref.current) d1Ref.current.textContent = "0";
    if (d2Ref.current) d2Ref.current.textContent = "0";
    if (msgRef.current) msgRef.current.textContent = "";

    // sembunyikan angka + message + tombol dari awal
    if (d1Ref.current) gsap.set(d1Ref.current, { autoAlpha: 0, y: 8 });
    if (d2Ref.current) gsap.set(d2Ref.current, { autoAlpha: 0, y: 8 });
    if (msgRef.current) gsap.set(msgRef.current, { autoAlpha: 0 });
    if (wishBtnWrapRef.current)
      gsap.set(wishBtnWrapRef.current, { autoAlpha: 0, y: 8 });

    const tl = gsap.timeline({ delay: 0.35 });

    // 1) typewriter: "Anyway Airen"
    const firstLine = `Anyway ${name || "Airen"}`;
    typeText(tl, headlineRef.current, firstLine, { speed: 0.18 });

    tl.to({}, { duration: 2 });

    // 2) backspace per karakter (PASTI kerasa)
    backspacePerChar(tl, headlineRef.current, firstLine, { step: 0.08 });

    tl.to({}, { duration: 1 });

    // 3) typewriter: "Selamat Ulang Tahun Ke"
    typeText(tl, headlineRef.current, "Selamat Ulang Tahun Yang Ke", {
      speed: 0.2,
    });

    // 4) munculin angka (fade in) lalu roll
    tl.to([d1Ref.current, d2Ref.current], {
      autoAlpha: 1,
      y: 0,
      duration: 2,
      ease: "power2.out",
    });

    // digit pertama: stop di 2
    tl.add(rollTo(d1Ref.current, 2, 1.0), ">");

    // digit kedua: stop di 9 (jadi "29")
    tl.add(rollTo(d2Ref.current, 9, 1.1), "<0.15");

    // pause di "29"
    tl.to({}, { duration: 1.4 });

    // digit kedua: stop di 2 (jadi "22")
    tl.add(rollTo(d2Ref.current, 2, 0.9), ">");

    // 5) setelah angka fix, munculin area message (tapi teksnya diketik)
    tl.to(msgRef.current, { autoAlpha: 1, duration: 0.01 });

    const message =
      `Ahahaha 29, becanda, senyum dikit dong,dan YUPP Selamat bertambah usia, ${
        name || "airen"
      }.\n\n` +
      `Aku harap di usia yang baru ini, kamu makin sering ngerasa disayang,makin yakin sama diri kamu, dan makin bahagia. dan tentu saja apa yang kamu harapin di tahun ini semoga bisa tercapai yaa.\n\n` +
      `Semoga hidup ke depannya lebih ramah sama kamu, lebih banyak hari tenang, lebih sedikit rasa berat, terimakasih udah bertahan sampai sejauh ini, kamu berharga.`;

    // typewriter message
    typeText(tl, msgRef.current, message, { speed: 0.1 });

    // 6) setelah message selesai, munculin tombol
    tl.to(wishBtnWrapRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.55,
      ease: "power2.out",
    });

    return () => tl.kill();
  }, [isActive, name]);

  return (
    <div className="absolute inset-0 z-0">
      {/* background */}
      <div className="absolute inset-0 bg-bg1" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_35%_18%,rgba(255,122,217,0.22),transparent_60%),radial-gradient(800px_500px_at_75%_20%,rgba(122,252,255,0.16),transparent_55%)]" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-4">
          <div ref={musicWrapRef}>
            <MusicCard
              gifSrc="/images/gifts/music-play.gif"
              title="The 1975 - About You"
              playingText="is playing"
              audioRef={audioRef}
            />
          </div>

          <div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 text-center"
            ref={cardWrapRef}
          >
            {/* headline typewriter */}
            <div className="text-xs text-white/60 tracking-wide min-h-[18px]">
              <span ref={headlineRef} />
              <span className="inline-block w-[8px] animate-pulse">▍</span>
            </div>

            {/* angka besar */}
            <div className="mt-3 flex items-end justify-center gap-1">
              <span
                ref={d1Ref}
                className="text-7xl sm:text-8xl font-extrabold text-white leading-none"
              >
                0
              </span>
              <span
                ref={d2Ref}
                className="text-7xl sm:text-8xl font-extrabold text-white leading-none"
              >
                0
              </span>
            </div>

            {/* message typewriter (hidden dulu, muncul setelah angka fix) */}
            <div
              ref={msgRef}
              className="mt-5 text-sm sm:text-base text-white/80 leading-relaxed text-justify whitespace-pre-line opacity-0"
            />

            {/* button muncul setelah message selesai */}
            <div ref={wishBtnWrapRef} className="mt-6 opacity-0">
              <button
                onClick={handleWishClick}
                className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3
                           hover:bg-white/10 transition flex items-center justify-between"
              >
                <div className="text-left">
                  <div className="text-sm font-semibold text-white">
                    Make a wish
                  </div>
                  <div className="text-xs text-white/70">
                    Ayo buat sebuah harapan untuk kamu
                  </div>
                </div>
                <span className="text-white/80">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
