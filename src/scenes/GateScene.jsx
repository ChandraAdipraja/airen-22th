import GateCard from "../components/GateCard";

export default function GateScene({ gateSceneRef, onContinue }) {
  return (
    <div ref={gateSceneRef} className="absolute inset-0 z-20">
      <div className="absolute inset-0 bg-bg1" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_20%_10%,rgba(255,122,217,0.22),transparent_60%),radial-gradient(800px_500px_at_80%_15%,rgba(122,252,255,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <GateCard
          question="Nama Panggilanmu"
          placeholder="Tulis nama panggilanmu…"
          acceptedAnswers={["Airen", "Airenn", "Aienn", "Aiena"]}
          wrongGifSrc="images/gifts/wrong.gif"
          successGifSrc="images/gifts/success.gif"
          onContinue={onContinue}
        />
      </div>
    </div>
  );
}
