import React from "react";
import { Link } from "react-router-dom";
import "./Subject.css";

export default function Subject() {
  return (
    <>
      <div className="main">
        <h1 className="">Subjects</h1>
        <div className="subject-container">
          <ul>
            <li>
              <button className="subject-btn">English</button>
            </li>
            <li>
              <button className="subject-btn">Hindi</button>
            </li>
            <li>
              <button className="subject-btn">Science</button>
            </li>
            <li>
              <button className="subject-btn">Social</button>
            </li>
          </ul>
          <div className="button-container">
            <button className="subject-btn">Back</button>
            <button className="subject-btn">Repeat</button>
          </div>
        </div>
      </div>
    </>
  );
}
