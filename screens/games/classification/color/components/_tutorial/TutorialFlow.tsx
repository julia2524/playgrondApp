import React, { useState } from "react";

// import PracticeStep from "./steps/PracticeStep";
import WelcomeStep from "./_WelcomeStep";
import DemoStep from "./DemoStep";
import PracticeStep from "./PracticeStep";

interface TutorialFlowProps {
  onComplete: () => void;
}

type TutorialStep = "welcome" | "demo" | "practice";

export default function TutorialFlow({ onComplete }: TutorialFlowProps) {
  const [step, setStep] = useState<TutorialStep>("welcome");
  console.log("현재 튜토리얼 스텝:", step); // 🌟 단계가 어떻게 바뀌는지 확인!

  if (step === "welcome") {
    return <WelcomeStep onNext={() => setStep("demo")} />;
  }

  if (step === "demo") {
    return <DemoStep onNext={() => setStep("practice")} />;
  }

  // step === "practice"
  return <PracticeStep onSuccess={onComplete} />;
}
