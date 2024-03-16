import React, { useRef } from "react";
import { handleSpeak } from "./speechUtils";

export default function HomePage() {
  const hasSpokeRef = useRef(false);

  const handleSpeakButton = () => {
    handleSpeak(hasSpokeRef, 'homepage');
  };

  return (
    <div className="homepage">
      <h1>Welcome to HOME page</h1>
      <button onClick={handleSpeakButton}>Speak</button>
    </div>
  );
}
