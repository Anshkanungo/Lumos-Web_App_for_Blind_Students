import React, { useRef } from "react";
import { handleSpeak } from "./speechUtils";
import "./English.css";

const English = () => {
  const hasSpokeRef = useRef(false);
  const handleSpeakButton = () => {
    handleSpeak(hasSpokeRef, "main");
  };

  return (
    <>
      <div className="main">
        <h1 className="">English</h1>
        <div className="subject-container">
          <ul>
            <li>
              <button className="english-btn">Transcript</button>
            </li>
            <li>
              <button className="english-btn">Notes</button>
            </li>
            <li>
              <button className="english-btn">Mnemonics</button>
            </li>
          </ul>
          <div className="button-container">
            <button className="english-btn">Back</button>
            <button className="english-btn" onClick={handleSpeakButton}>
              Speak
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default English;
