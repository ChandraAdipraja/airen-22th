import MusicCard from "../components/MusicCard";
import { useEffect, useMemo, useRef, useState } from "react";

export const timelineData = [
  {
    time: "25, July 2025",
    title: "Everest - First Meet",
    desc: "Pertama kali bertemu, iya, ini adalah pertemuan termahal, chance secret di fish it pun 1/100M kalah, tapi screenshot nya sayang banget tidak ada",
    images: [""],
  },
  {
    time: "1, August 2025",
    title: "Antartika",
    desc: "Ngga ada ScreenShot pertama, tapi inget ga dulu ? try hard legend sampe jam 2 ahaha, ada gila-gilanya juga. Aku harap bisa merasakan hal ini lagi, hal yang seexcited ini lagi, betapa serunya waktu itu, gimana cara aku melupakan ini ? Tell me",
    images: ["/images/timeline/timeline-2.png"],
  },
  {
    time: "20 August 2025",
    title: "Mt Lawak",
    desc: "Kalo dipikit-pikir, ini kayaknya yang paling gamau dipikirin deh, masih inget tangga toppoki ? aduh lemes rasanya. Tapi masih sangat seru, karena dontol nya itu yang bikin seru",
    images: ["/images/timeline/timeline-3.png"],
  },
  {
    time: "21 August 2025",
    title: "Mt Sibuatan",
    desc: "Kalo ini... `Chan Mana Plang Nyaaaa Kok Ga Difotoooo ? 😭`. Lucu dan ahaha takut banget, mana ini gunung pertama yang cp nya banyak banget lagi, tamat berapa hari ya",
    images: ["/images/timeline/timeline-4.png"],
  },
  {
    time: "23 August 2025",
    title: "Mt Batu",
    desc: "Lucu banget ini pada dikutuk ahahaha, sempet mau foto pake ava asli gajadi mulu karena kutukan admin shibawl, berapa kali ya sampe respawn nya itu ahaha",
    images: ["/images/timeline/timeline-5.png"],
  },
  {
    time: "10 September 2025",
    title: "Mt Lembayana",
    desc: "Disini kayaknya paling gawe itu aku deh, kamu kayaknya 30% ? nooo 3% sepertinya ahaha, tapi gapapa yang penting main bareng. Iya airen, selama main bareng sama kamu, apapun itu tidak apa-apa",
    images: ["/images/timeline/timeline-7.png"],
  },
  {
    time: "27 September 2025",
    title: "Fish it - Blopshark",
    desc: "Ahahahaha mirip kann ?. Aaaa sedih banget, kita gabisa gini lagi",
    images: ["/images/timeline/timeline-18.png"],
  },
  {
    time: "07 October 2025",
    title: "Mt Forgot 😭",
    desc: "Halooo airen, isiin bensinku dong, abis ni, mulai dari 0 ya ? tapi ini bukan tentang bensin",
    images: ["/images/timeline/timeline-8.png"],
  },
  {
    time: "14 October 2025",
    title: "Forgot Again",
    desc: "Aduh lucu bangett lagi, waktu cara jalanmu disini dibikin lambat, perutku sampe sakit gara-gara kelucuan ini, dan juga analog itu kursor ya ? ahaha",
    images: ["/images/timeline/timeline-19.png"],
  },
  {
    time: "21 October 2025",
    title: "Mt Kerja Sama (Forgot Again)",
    desc: "Tentu saja bukti kita bisa menyelesaikan gunung ini karena kita udah sangat dekat, chemistry kita udah sangat bagus, gunung apapun udah sangat gampang untuk ditaklukan",
    images: ["/images/timeline/timeline-10.png"],
  },
  {
    time: "22 October 2025",
    title: "Mt Qian",
    desc: "Teringat moment `Ih kamu couplean ama cewe itu`, airen, jujur disini aku sangat senang kamu memperhatikan hal sekecil itu, aku sangat senang kalo kamu merasa cemburu, karena itu artinya aku merasa ada",
    images: ["/images/timeline/timeline-11.png"],
  },
  {
    time: "26 October 2025",
    title: "Mt Gemi",
    desc: "Badmood karena ditinggalin 1 CP dan langsung out game, memang itu adalah sebuah kesalahan. Tapi disisi lain, aku mikir juga, `ah airen ini ternyata apa yang dicari selama mabar ini, yaitu quality time nya`, im very very happy with this",
    images: ["/images/timeline/timeline-12.png"],
  },
  {
    time: "30 October 2025",
    title: "Fish it - Halloween",
    desc: "Hei, aku penumpang pertama boat iniiii, omg aku senang banget disini airen, kamu menerima excited ku disini, aku lupa nama boatnya ini apa,emm ai-?",
    images: ["/images/timeline/timeline-13.png"],
  },
  {
    time: "01 November 2025",
    title: "Dangerous ATV Driving",
    desc: "Ahaha, nggak kalah seru, disini perutku juga sakit banget gara-gara ketawa terus ngeliat kamu yang jatoh mulu. kamu sekarang udah jago belum ngendarain ini ? aahaah",
    images: ["/images/timeline/timeline-14.png"],
  },
  {
    time: "03 November 2025",
    title: "Fish it - Couple ?",
    desc: "Aiahaha, kalo mendengar couplean itu, jujur aku suka ngematching in outfit barumu airen, waktu kamu beli yang pink, aku beli pink, gray, black, white, cuman untuk samaan doang, apa kamu sadar itu ?",
    images: ["/images/timeline/timeline-15.png"],
  },
  {
    time: "16 November 2025",
    title: "Fish it - Katana Skin ?",
    desc: "Lihatlahh, kita serius pergi ke sekian kalinya buat dapetin dino ruin itu yang beneran scammm ?, ahaha kita juga sempet foto ya, dan ada yang nguping kayaknya ahaha kamu ingat ?",
    images: ["/images/timeline/timeline-16.png"],
  },
  {
    time: "18 November 2025",
    title: "Everest - Bring Back The Past",
    desc: "Lihat ini, kita berdua nyobain lagi everest dimana kita bertemu.., untuk throwback aja kali ya ahaha yaa meskipun pada akhirnya kamu ga summit ahahaha",
    images: ["/images/timeline/timeline-20.png"],
  },
  {
    time: "26 November 2025",
    title: "Relapse - The End ?",
    desc: "Ah... ternyata kita udah sampai ke penghujung moment ya, iya airen disini kamu menghilangkan beban yang kamu terus tutupin, disini kamu bilang `aku jahat`, tentu saja ngga, kalo karena deket satu sama yang lain, bukankah itu wajar ? namanya juga orang yang belum punya hubungan sama siapa-siapa ?, bukankah wajar untuk dekat sama siapa aja ? please airen kamu disini ngga salah kok, kamu bohongin aku itu nggak kok, kamu bilang ngga punya cowo emang beneran ngga punya kan ?. so please jangan nyalahin diri kamu sendiri",
    images: ["/images/timeline/timeline-21.png"],
  },
];

export default function TimelineScene({
  timelineSceneRef,
  name,
  onContinue,
  audioRef,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  const containerRef = useRef(null);
  const endRef = useRef(null);

  const itemRefs = useRef([]);
  itemRefs.current = [];

  const setItemRef = (el, i) => {
    if (el) itemRefs.current[i] = el;
  };

  // Observer untuk "active item" (besar-kecil)
  useEffect(() => {
    const rootEl = containerRef.current;
    if (!rootEl) return;

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);

    const io = new IntersectionObserver(
      (entries) => {
        let best = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (best) {
          const idx = Number(best.target.getAttribute("data-index"));
          if (!Number.isNaN(idx)) setActiveIndex(idx);
        }
      },
      {
        root: rootEl,
        threshold: thresholds,
        rootMargin: "-40% 0px -40% 0px",
      }
    );

    itemRefs.current.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Observer untuk "sudah sampai bawah" (munculin continue card)
  useEffect(() => {
    const rootEl = containerRef.current;
    const target = endRef.current;
    if (!rootEl || !target) return;

    const io = new IntersectionObserver(
      ([entry]) => setAtEnd(entry.isIntersecting),
      {
        root: rootEl,
        threshold: 0.6,
      }
    );

    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 z-0" ref={timelineSceneRef}>
      {/* background */}
      <div className="absolute inset-0 bg-bg1" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_30%_15%,rgba(255,122,217,0.18),transparent_60%),radial-gradient(800px_500px_at_80%_20%,rgba(122,252,255,0.14),transparent_55%)]" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-4">
          {/* MUSIC CARD (tetap muncul + kontrol audio) */}
          <MusicCard
            gifSrc="/images/gifts/music-play.gif"
            title="The 1975 - About You"
            playingText="is playing"
            audioRef={audioRef}
          />

          {/* TIMELINE CARD */}
          <div
            ref={containerRef}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 max-h-[70vh] overflow-y-auto hide-scrollbar"
          >
            <div className="text-xs inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70">
              🕰️ Moments before your day
            </div>

            <h2 className="mt-3 text-2xl font-semibold text-white">
              Before your birthday
            </h2>

            <p className="mt-1 text-sm text-white/70">
              Beberapa momen kecil yang aku simpan sebelum hari spesialmu.
            </p>

            {/* LIST MOMENTS */}
            <div className="mt-6 space-y-8">
              {timelineData.map((item, i) => {
                const isActive = i === activeIndex;

                return (
                  <div
                    key={i}
                    data-index={i}
                    ref={(el) => setItemRef(el, i)}
                    className={[
                      "relative pl-6 transition-all duration-500 snap-center",
                      isActive
                        ? "scale-[1.02] opacity-100"
                        : "scale-[0.94] opacity-55",
                    ].join(" ")}
                  >
                    {/* timeline line */}
                    <span className="absolute left-1 top-2 h-full w-px bg-white/15" />
                    <span
                      className={[
                        "absolute left-0 top-2 h-3 w-3 rounded-full transition-all duration-500",
                        isActive
                          ? "bg-[var(--accent)] scale-110"
                          : "bg-white/30 scale-100",
                      ].join(" ")}
                    />

                    <div
                      className={
                        isActive
                          ? "text-xs text-white/70"
                          : "text-xs text-white/40"
                      }
                    >
                      {item.time}
                    </div>

                    <div
                      className={[
                        "mt-1 font-medium transition-all duration-500",
                        isActive
                          ? "text-white text-lg"
                          : "text-white/80 text-base",
                      ].join(" ")}
                    >
                      {item.title}
                    </div>

                    <div
                      className={[
                        "mt-1 leading-relaxed transition-all duration-500",
                        isActive
                          ? "text-white/85 text-sm"
                          : "text-white/55 text-sm",
                      ].join(" ")}
                    >
                      {item.desc}
                    </div>

                    {/* IMAGES */}
                    {item.images?.length > 0 && (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {item.images.map((src, idx) => (
                          <img
                            key={idx}
                            src={src}
                            alt="timeline"
                            className={[
                              "rounded-xl border border-white/10 object-cover aspect-video transition-all duration-500",
                              isActive
                                ? "scale-100 opacity-100"
                                : "scale-[0.96] opacity-70",
                            ].join(" ")}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 text-justify text-md text-white/50">
              Yup, sebenernya harusnya lebih banyak dari ini, cuman ntah kemana
              screenshot nya, dan juga aku hanya share yang dimana ada foto ava
              kita berdua aja. Huftttt oiya kalau kamu baca ini per tanggal 3
              hari ini, atau mungkin tanggal 4 atau mungkin kedepannya. Jujur
              aku masih belum bisa menerima kenyataan ini, aku masih belum bisa
              ngejalanin activity yang biasanya ada kamu yang selalu nemenin.
              Meskipun memang tidak nemenin secara dekat, tapi kalo arti dekat
              itu bisa diluasin lagi, communication juga membuatku merasa dekat.
              Ahhh, <span className="text-pink-500">airen </span>
              <span className="text-white">
                jangan lupa makan, jangan begadang, kerja secukupnya aja, jaga
                immune tubuh, jangan sampai drop karena kerjaan lagi
              </span>
              Semangat ya airen, senang bisa mengenalmu ditahun kemarin.
            </div>

            {/* ===== ENDING SECTION ===== */}
            <div className="mt-10 pt-6 border-t border-white/10">
              <img
                src="/images/timeline/saved-memories.png"
                alt="All memories"
                className="w-full rounded-2xl border border-white/10 object-cover aspect-video"
              />

              <p className="mt-4 text-center text-sm text-white/80 leading-relaxed">
                Memori yang lain masih ada, <br />
                <span className="text-white/90 line-through">
                  akan kah cerita ini terus berlanjut?
                </span>
              </p>

              {/* sentinel: patokan "udah sampai bawah" */}
              <div ref={endRef} className="h-6" />

              {/* Continue Card (muncul kalau atEnd) */}
              <div
                className={[
                  "mt-5 transition-all duration-500",
                  atEnd
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none",
                ].join(" ")}
              >
                <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">
                        Lanjut
                      </div>
                      <div className="text-xs text-white/70">
                        Its okay, lanjut aja, udah ngga sedih
                      </div>
                    </div>

                    <button
                      onClick={onContinue}
                      className="rounded-xl border border-pink-400/30 bg-pink-400/15 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-400/25 transition"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
