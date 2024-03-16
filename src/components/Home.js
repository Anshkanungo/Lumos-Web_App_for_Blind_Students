import React, { useRef } from "react";

export default function HomePage() {
  const hasSpokeRef = useRef(false);

  const handleSpeak = () => {
    if (!hasSpokeRef.current && window.speechSynthesis) {
      const message = new SpeechSynthesisUtterance("Welcome to the HOME page");
      window.speechSynthesis.speak(message);
      message.addEventListener("end", () => {
        console.log("Speech synthesis ended");
        // Reset hasSpokeRef after speech synthesis ends
        hasSpokeRef.current = false;
      });
      hasSpokeRef.current = true;
    } else {
      console.error("Speech synthesis is not supported in this browser.");
    }
  };

  return (
    <div>
      <h1>Welcome to HOME page</h1>
      <button onClick={handleSpeak}>Speak</button>
    </div>
  );
}
