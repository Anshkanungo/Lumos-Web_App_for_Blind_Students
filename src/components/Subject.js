import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Subject.css";
import { handleSpeak } from "./speechUtils";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function Subject() {
  const [subject, setSubject] = useState("");
  const subjects = ["english", "hindi", "science", "social"];
  const navigate = useNavigate();

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });

    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  const commands = [
    {
      command: "select *",
      callback: (subject) => handleSubjectSelection(subject),
    },
    {
      command: "go back",
      callback: () => handleGoBack(),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });

  const handleSpeakButton = () => {
    handleSpeak("subject-page");
  };

  const handleSubjectSelection = (recognizedSubject) => {
    const matchingSubject = subjects.find(
      (subj) => subj === recognizedSubject.toLowerCase()
    );
    console.log(matchingSubject)
    if (matchingSubject) {
      setSubject(matchingSubject);
    }
  };

  const handleGoBack = () => {
    navigate(-1)
  };

  return (
    <div className="subject-page">
      <h1 className="">Subjects</h1>
      <div className="subject-container">
        <ul>
          {subjects.map((subj) => (
            <li key={subj}>
              <button
                className="subject-btn"
                onClick={() => handleSubjectSelection(subj)}
              >
                {subj.charAt(0).toUpperCase() + subj.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <div className="button-container">
          <button className="subject-btn" onClick={() => navigate(-1)}>Back </button>
          <button className="subject-btn" onClick={handleSpeakButton}>
            Speak
          </button>
        </div>
      </div>
      <p>You said: {transcript}</p>
    </div>
  );
}
