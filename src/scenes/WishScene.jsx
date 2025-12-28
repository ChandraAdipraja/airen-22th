import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function WishScene({ wishSceneRef, isActive, onDone }) {
  const envelopeRef = useRef(null);
  const modalRef = useRef(null);

  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [wish, setWish] = useState("");

  // masuk scene: envelope muncul
  useEffect(() => {
    if (!isActive) return;

    setHasOpenedOnce(false);
    setShowModal(false);
    setWish("");

    if (!envelopeRef.current) return;

    gsap.set(envelopeRef.current, { autoAlpha: 0, scale: 0.92, y: 12 });
    gsap.to(envelopeRef.current, {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
    });
  }, [isActive]);

  const openEnvelope = () => {
    if (!envelopeRef.current) return;

    // animasi “buka amplop” cuma sekali
    if (!hasOpenedOnce) {
      setHasOpenedOnce(true);

      gsap.to(".env-flap", {
        rotateX: -160,
        transformOrigin: "top center",
        duration: 0.7,
        ease: "power2.inOut",
      });

      gsap.to(".env-letter", {
        y: "-35%",
        duration: 0.7,
        ease: "power2.out",
        delay: 0.15,
      });
    }

    // setiap klik (baik setelah Nanti atau belum) tetap bisa munculin modal
    setShowModal(true);
  };

  const handleLater = () => {
    // cuma nutup modal, amplop tetap open
    setShowModal(false);
  };

  const confirmWish = () => {
    setShowModal(false);

    // animasi teks muncul di surat (wish-text)
    gsap.fromTo(
      ".wish-text",
      { autoAlpha: 0, y: 6 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );

    const tl = gsap.timeline({ delay: 0.9 });

    // kertas masuk lagi
    tl.to(".env-letter", {
      y: "0%",
      duration: 0.5,
      ease: "power2.inOut",
    });

    // flap nutup lagi
    tl.to(
      ".env-flap",
      {
        rotateX: 0,
        duration: 0.6,
        ease: "power2.inOut",
      },
      "<0.1"
    );

    // amplop slide ke atas (keluar layar), lalu lanjut ke next scene
    tl.to(
      envelopeRef.current,
      {
        yPercent: -140,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.inOut",
      },
      "+=0.25"
    ).add(() => onDone?.());
  };

  if (!isActive) return null;

  return (
    <div ref={wishSceneRef} className="absolute inset-0 z-50">
      {/* background lembut */}
      <div className="absolute inset-0 bg-bg1" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_18%,rgba(255,122,217,0.18),transparent_60%),radial-gradient(800px_500px_at_50%_60%,rgba(122,252,255,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        {/* ENVELOPE */}
        <div ref={envelopeRef} className="w-full max-w-md">
          <button
            onClick={openEnvelope}
            className="w-full text-left rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 hover:bg-white/10 transition"
          >
            <div className="text-center text-white/80 text-sm mb-4">
              Make A Wish
            </div>

            {/* Amplop lebih “surat banget” */}
            <div className="relative mx-auto w-full aspect-[4/3] bg-pink-500 rounded-3xl">
              {/* bayangan luar */}
              <div className="absolute inset-0 rounded-3xl bg-black/20 blur-xl" />

              <div className="relative inset-0 h-full rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 overflow-hidden">
                {/* body amplop */}
                <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-b from-pink-200 to-pink-600">
                  {/* lipatan bawah */}
                  <div className="absolute inset-x-6 bottom-0 h-[60%] bg-pink-400 border-2 border-pink-50 rotate-[-2deg] rounded-t-3xl" />
                </div>

                {/* flap segitiga */}
                <div
                  className="env-flap absolute inset-x-0 top-0 h-[55%] origin-top"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-b from-pink-500 to-pink-300" />
                    <div
                      className="absolute left-1/2 bottom-[-1px] w-[120%] aspect-[2/1] -translate-x-1/2 bg-gradient-to-b from-pink-500 to-pink-50"
                      style={{
                        clipPath: "polygon(50% 100%, 0 0, 100% 0)",
                      }}
                    />
                  </div>
                </div>

                {/* kertas di dalam amplop */}
                <div className="env-letter absolute left-1/2 bottom-0 w-[82%] -translate-x-1/2 translate-y-0">
                  <div className="rounded-2xl border border-white/30 bg-pink-200 text-black/80 px-4 py-3 shadow-lg">
                    <div className="text-[11px] font-medium tracking-wide text-black/50">
                      Wish for you
                    </div>
                    <div className="wish-text mt-1 text-sm whitespace-pre-line break-words max-h-24 overflow-y-auto pr-1">
                      {wish || "…"}
                    </div>
                  </div>
                </div>

                {/* teks “tap to open” di depan amplop */}
                <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none">
                  <div className="px-3 py-1 rounded-full bg-pink-500 text-[11px] text-white/80">
                    Tap to open
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* MODAL INPUT WISH */}
        {showModal && (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/55" />
            <div
              ref={modalRef}
              className="relative z-10 w-full max-w-md rounded-3xl border border-pink-50 bg-white/5 backdrop-blur p-6"
            >
              <div className="text-white font-semibold text-lg">
                Make a wish ✨
              </div>
              <div className="text-white/70 text-sm mt-1">
                Harapan ini tidak akan bisa aku lihat kok airen, jadi aman
              </div>

              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                rows={4}
                className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 text-white/90 p-4 outline-none focus:border-white/20"
                placeholder="Aku berharap..."
              />

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={handleLater}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
                >
                  Nanti
                </button>
                <button
                  onClick={confirmWish}
                  disabled={!wish.trim()}
                  className="rounded-xl border border-pink-400/30 bg-pink-400/15 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-400/25 transition disabled:opacity-40 disabled:hover:bg-pink-400/15"
                >
                  Confirm →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
