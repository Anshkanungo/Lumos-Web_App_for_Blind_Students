import React from "react";
import { Speak } from "./speechUtils";
import logo from "../assets/Logo.jpg";
import "./Home.css";

export default function HomePage() {
  return (
    <div className="homepage">
      <img className="logo" onClick={Speak("Welcome to lumos")} src={logo} alt="logo" />
    </div>
  );
}
