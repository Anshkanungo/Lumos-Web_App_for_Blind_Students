import React from "react";
import { Link } from "react-router-dom";

export default function Subject() {
  return (
    <>
      <div className="main">
        <h1 className="">Subjects</h1>
        <div className="subject-container">
          <ul>
            <li>
              <button>English</button>
            </li>
            <li>
              <button>Hindi</button>
            </li>
            <li>
              <button>Science</button>
            </li>
            <li>
              <button>Social</button>
            </li>
          </ul>
          <div className="button-container">
            <button>Back</button>
            <button>Repeat</button>
          </div>
        </div>
      </div>
    </>
  );
}
