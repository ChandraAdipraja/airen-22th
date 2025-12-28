import { useMemo, useState } from "react";
import Modal from "./Modal";

function normalize(s) {
  return String(s ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export default function GateCard({
  question = "Siapa nama lengkap kamu?",
  placeholder = "Tulis nama lengkap kamu…",
  acceptedAnswers = [],
  wrongGifSrc = "/images/gifts/wrong.gif",
  successGifSrc = "/images/gifts/success.gif",
  onContinue, // dipanggil saat klik Continue di popup sukses
}) {
  const [value, setValue] = useState("");
  const [popup, setPopup] = useState(null); // null | "wrong" | "success"

  const acceptedSet = useMemo(() => {
    return new Set(acceptedAnswers.map(normalize));
  }, [acceptedAnswers]);

  const submit = (e) => {
    e.preventDefault();

    const ok = acceptedSet.has(normalize(value));
    setPopup(ok ? "success" : "wrong");
  };

  const closeWrong = () => {
    setPopup(null);
    // optional: auto focus input lagi, tapi ini cukup
  };

  const continueSuccess = () => {
    setPopup(null);
    onContinue?.(value);
  };

  return (
    <>
      <div className="w-full max-w-lg mx-auto">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-[0_20px_80px_rgba(0,0,0,0.28)]">
          <div className="text-xs inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70">
            Hi, Please Jawab Pertanyaan Ini Buat Ngekonfirmasi Kalo Itu Kamu
          </div>

          <h2 className="mt-3 text-xl font-semibold text-white">{question}</h2>
          <p className="mt-1 text-sm text-white/70">
            Ini Harusnya Mudah Kalo Itu Kamu
          </p>

          <form onSubmit={submit} className="mt-4 space-y-3">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-pink-400/40"
            />

            <button
              type="submit"
              className="w-full rounded-xl px-4 py-3 font-semibold border border-pink-400/30 bg-pink-400/15 hover:bg-pink-400/20 transition text-white"
            >
              Unlock 💗
            </button>
          </form>
        </div>
      </div>

      {/* WRONG POPUP */}
      <Modal
        open={popup === "wrong"}
        title="Maaf Ini Bukan Kamu, Atau Mungkin Aku Lupa Pernah Memanggilmu Ini"
        primaryText="Coba lagi"
        onPrimary={closeWrong}
        onClose={closeWrong}
      >
        <div className="flex flex-col items-center text-center gap-3">
          <img
            src={wrongGifSrc}
            alt="Wrong gif"
            className="w-40 h-40 object-contain rounded-xl"
          />
          <p className="text-white/80 text-sm">
            Hahh <span className="font-extrabold">{value}</span> ? siapa itu ?
            website ini bukan untuk dia, atau mungkin kamu typo ?
          </p>
        </div>
      </Modal>

      {/* SUCCESS POPUP */}
      <Modal
        open={popup === "success"}
        title="Ini Orangnya 🎉"
        primaryText="Continue"
        onPrimary={continueSuccess}
        onClose={continueSuccess}
        secondaryText="Belum"
        onSecondary={() => setPopup(null)}
      >
        <div className="flex flex-col items-center text-center gap-3">
          <img
            src={successGifSrc}
            alt="Success gif"
            className="w-40 h-40 object-contain rounded-xl"
          />
          <p className="text-white/80 text-sm">
            Halo {value}, kalo kamu udah buka ini berarti gift sudah diterima
            ya, terimakasih. Oiya, kuharap kamu membuka ini waktu dirumah aja,
            jangan di tempat kerja
          </p>
        </div>
      </Modal>
    </>
  );
}
