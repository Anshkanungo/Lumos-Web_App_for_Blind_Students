import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { handleSpeak } from "./speechUtils";
import "./Notes.css";

export default function Notes() {
  const hasSpokeRef = useRef(false);
  const handleSpeakButton = () => {
    handleSpeak(hasSpokeRef, "main");
  };
  return (
    <>
      <div className="main">
        <h1 className="">Notes</h1>
        <ul>
          <li>
            <Link to={"/notes/unit-1"}>Unit 1</Link>
          </li>
          <li>
            <Link to={"/notes/unit-2"}>Unit 2</Link>
          </li>
          <li>
            <Link to={"/notes/unit-3"}>Unit 3</Link>
          </li>
          <li>
            <Link to={"/notes/unit-4"}>Unit 4</Link>
          </li>
          <li>
            <Link to={"/notes/unit-5"}>Unit 5</Link>
          </li>
        </ul>

        <div className="button-container">
          <button>Back</button>
          <button onClick={handleSpeakButton}>Speak</button>
        </div>
      </div>
    </>
  );
}
