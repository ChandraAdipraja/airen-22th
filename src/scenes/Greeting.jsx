import { useMemo, useRef } from "react";
import MusicCard from "../components/MusicCard";
import Typewriter from "../components/TypeWriter";

export default function Greeting({
  nextSceneRef,
  phase,
  name,
  typingDone,
  setTypingDone,
  onContinueNext,
  audioRef, // boleh dipakai atau nggak
}) {
  const scrollAreaRef = useRef(null);

  const nextText = useMemo(() => {
    return `Haiii ${name || "Airen"} 💖 How Are Youu ?

Kalau kamu lagi baca ini sambil dengerin music yang lagi play di background ini, berarti aku berhasil.Karena jujur aja, setiap aku mendengar lagu ini, yang ada dipikiranku itu hanya tertuju kepadamu

Bukan karena liriknya,tapi karena rasanya.Rasa tenang yang aneh, rasa hangat yang pelan, kayak lagi diingatkan kalau ada seseorang yang bikin semuanya terasa lebih ringan, tanpa kemarahan.

Aku tau kok airen, kita nggak selalu dekat secara jarak.Kadang cuma lewat layar, kadang cuma lewat voice, kadang bahkan cuma lewat diam ahaha.Tapi anehnya :(, di sela-sela itu semua, aku ngerasa kita itu sangat dekat airen. Rasa aneh dan nyaman seperti ini, tapi aku suka.

Kalau suatu hari kamu lagi capek, ngeluh karena kerjaan, atau lagi feeling lonely ,aku harap kamu ingat satu hal kecil ini,di waktu yang sama, ada seseorang yang sedang mikirin kamu sambil dengerin lagu ini, dan senyum sendiri.

Oh iya...

Kamu juga bisa talk ke aku, atau kalau itu sulit, mungkin server primodial, yang akan selalu terbuka untukmu. Jangan pernah merasa kesepian airen, orang seperti kamu harus bahagia, dan tersenyum didunia ini.

Juga, aku mau bilang makasih, nggak banyak orang yang aku temui di 2025 itu, tapi makasih banyak sudah mau meluangkan waktunya buat aku. Maaf, maaf sudah membawamu sejauh ini. Maaf pernah ada rasa suka dan rasa nyaman kepadamu. Aku sangat beruntung pernah mengenalmu lebih jauh, terimakasih, dan... maaf...

Ahhhh, kenapa malah seperti ini ya, padahal teks aslinya bukan gini. Airen, takdir itu bisa dirubah, jangan pernah pasrah pada suatu hal, aku juga percaya takdir itu ada, tapi yang nentuin takdir itu kita sendiri. Mungkin kita hanya salah timeline saja.. kuharap aku masih bisa text with u.

Airen, mungkin ini akan membuatmu sedih jika terus melanjutkan ini, aku minta maaf, aku hanya ingin menyampaikan sesuatu kepada kamu.`;
  }, [name]);

  const show = phase === "greetings" || phase === "timeline";

  return (
    <div
      ref={nextSceneRef}
      className={`absolute inset-0 z-10 ${show ? "" : ""}`}
    >
      <div className="absolute inset-0 bg-bg1" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_20%_10%,rgba(255,122,217,0.22),transparent_60%),radial-gradient(800px_500px_at_80%_15%,rgba(122,252,255,0.18),transparent_55%)]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-3">
          {/* MUSIC CARD */}
          <MusicCard
            gifSrc="/images/gifts/music-play.gif"
            title="The 1975 - About You"
            playingText="is playing"
            audioRef={audioRef}
          />

          {/* TYPEWRITER CARD */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 max-h-[60vh] flex flex-col">
            <div className="text-xs inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70">
              A little message for you Airen
            </div>

            <div
              ref={scrollAreaRef}
              className="mt-4 flex-1 overflow-y-auto pr-2 hide-scrollbar"
            >
              {phase === "greetings" ? (
                <Typewriter
                  text={nextText}
                  speed={85}
                  startDelay={900}
                  scrollRef={scrollAreaRef}
                  onDone={() => setTypingDone(true)}
                  className="text-lg leading-relaxed text-white/90 whitespace-pre-line text-justify"
                />
              ) : (
                <div className="text-white/0 select-none">loading</div>
              )}
            </div>
          </div>

          {/* CONTINUE CARD */}
          {typingDone && phase === "greetings" && (
            <div className="w-full max-w-2xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3 animate-[fadeUp_.5s_ease-out]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">
                    Mau Melanjutkan Ini ?
                  </div>
                  <div className="text-xs text-white/70">
                    Jika dirasa tidak sanggup, tidak apa-apa. kamu bisa berhenti
                    disini dan kembali lagi nanti
                  </div>
                </div>

                <button
                  onClick={onContinueNext}
                  className="rounded-xl border border-pink-400/30 bg-pink-400/15 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-400/25 transition"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* AUDIO: kalau kamu mau audio di sini juga, tapi sebenarnya sudah cukup di App */}
          <audio ref={audioRef} src="/music/bgm.mp3" loop />
        </div>
      </div>
    </div>
  );
}
