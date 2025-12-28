import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import GateScene from "./scenes/GateScene";
import TimelineScene from "./scenes/TimelineScene";
import useAudioPlayer from "./hooks/useAudioPlayer";
import Greeting from "./scenes/Greeting";
import Birthday from "./scenes/Birthday";
import SplashScreen from "./components/SplashScreen";
import { time } from "framer-motion";
import WishScene from "./scenes/WishScene";
import Ending from "./scenes/Ending";

export default function App() {
  const gateSceneRef = useRef(null);
  const nextSceneRef = useRef(null);
  const timelineSceneRef = useRef(null);
  const wishSceneRef = useRef(null);

  // gate | greetings | timeline
  const [phase, setPhase] = useState("gate");
  const [name, setName] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  // audio handler
  const { audioRef, play } = useAudioPlayer("/music/bgm.mp3", {
    volume: 0.6,
    loop: true,
  });

  /* =======================
     GATE → GREETINGS
  ======================= */
  const handleContinueFromGate = (typedName) => {
    setName(String(typedName || "").trim());
    setTypingDone(false);

    gsap
      .timeline({
        defaults: { duration: 0.95, ease: "power3.inOut" },
        onComplete: () => setPhase("greetings"),
      })
      .to(gateSceneRef.current, { yPercent: -100 })
      .set(gateSceneRef.current, { display: "none" });
  };

  const handleContinueFromTimeline = () => {
    gsap
      .timeline({
        defaults: { duration: 0.95, ease: "power3.inOut" },
        onComplete: () => setPhase("birthday"),
      })
      .to(timelineSceneRef.current, { yPercent: -100 })
      .set(timelineSceneRef.current, { display: "none" });
  };

  /* =======================
     START MUSIC ON GREETINGS
  ======================= */
  useEffect(() => {
    if (phase === "greetings") {
      play(); // musik mulai & terus jalan
    }
  }, [phase, play]);

  /* =======================
     GREETINGS → TIMELINE
  ======================= */
  const handleContinueFromGreetings = () => {
    gsap
      .timeline({
        defaults: { duration: 0.95, ease: "power3.inOut" },
        onComplete: () => setPhase("timeline"),
      })
      .to(nextSceneRef.current, { yPercent: -100 })
      .set(nextSceneRef.current, { display: "none" });
  };
  const handleWish = () => {
    console.log("Make a wish clicked");
    setPhase("wish");
  };

  return (
    <div className="min-h-screen">
      <div className="relative min-h-screen overflow-hidden">
        {/* ===== TIMELINE SCENE (BELAKANG) ===== */}
        <Ending isActive={phase === "ending"} name={name || "Airen"} />

        <WishScene
          wishSceneRef={wishSceneRef}
          isActive={phase === "wish"}
          onDone={() => setPhase("ending")}
        />

        <Birthday
          isActive={phase === "birthday"}
          name={name}
          audioRef={audioRef}
          onWish={handleWish}
        />

        <TimelineScene
          timelineSceneRef={timelineSceneRef}
          name={name}
          audioRef={audioRef}
          onContinue={handleContinueFromTimeline}
        />

        <Greeting
          nextSceneRef={nextSceneRef}
          phase={phase}
          name={name}
          typingDone={typingDone}
          setTypingDone={setTypingDone}
          onContinueNext={handleContinueFromGreetings}
          audioRef={audioRef}
        />

        <GateScene
          gateSceneRef={gateSceneRef}
          onContinue={handleContinueFromGate}
        />
      </div>
    </div>
  );
}
