import React, { useEffect } from "react";
import { handleSpeak } from "./speechUtils";
import { useNavigate } from "react-router-dom";
import "./English.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Meto = () => {
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
      callback: (command) => handleCommand(command),
    },
    {
      command: "go back",
      callback: () => handleGoBack(),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });

  const handleSpeakButton = () => {
    handleSpeak("english-page");
  };

  const handleCommand = (command) => {
    switch (command) {
      
      case "mnemonics":
        navigate("/chapter")
        break;
      default:
        break;
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="english-page">
        <h1 className="">Mnemonics</h1>
        <div className="subject-container">
          <ul>
            <li>
              <button
                className="english-btn"
                onClick={() => handleCommand("transcript")}
              >
                Mnemonics-I
              </button>
            </li>
        
          </ul>
          <div className="button-container">
            <button className="english-btn" onClick={() => navigate(-1)}>
              Back
            </button>
            <button className="english-btn" onClick={handleSpeakButton}>
              Speak
            </button>
          </div>
        </div>
      </div>
      <p>You said: {transcript}</p>
    </>
  );
};

export default Meto;
