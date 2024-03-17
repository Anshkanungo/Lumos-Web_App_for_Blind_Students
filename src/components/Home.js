import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Speak } from "./speechUtils";
import logo from "../assets/Logo.jpg";
import "./Home.css";

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/subject");
    }, 7000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="homepage">
      <img
        className="logo"
        onClick={() => Speak("Welcome to lumos")}
        src={logo}
        alt="logo"
      />
    </div>
  );
}
