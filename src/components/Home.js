import React, { useRef } from "react";
import { handleSpeak } from "./speechUtils";
import logo from "../assets/Logo.jpg";
import "./Home.css";

export default function HomePage() {
  const hasSpokeRef = useRef(false);
  const handleSpeakButton = () => {
    handleSpeak(hasSpokeRef, "homepage");
  };

  return (
    <div className="homepage">
      <img className="logo" src={logo} alt="logo" />
      <h1 className="heading">Welcome to Home page </h1>
      <div className="subject-container">
        <button className="speak-button" onClick={handleSpeakButton}>
          Speak
        </button>
      </div>
    </div>
  );
}
