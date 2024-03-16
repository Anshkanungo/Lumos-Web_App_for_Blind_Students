import React, { useState, useEffect } from "react";
import HomePage from "./components/Home";
import SubjectPage from "./components/Subject";
import NotesPage from "./components/Notes";
import Chapter from "./components/Chapter";
import TestDataDisplay from "./components/Test";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import English from "./components/English";

function App() {
  const commands = [
    {
      command: ["Go to * page", "Go to *", "Open * page", "Open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [redirectUrl, setRedirectUrl] = useState("");
  const pages = ["home", "subject", "notes"];
  const urls = {
    home: "/",
    subject: "/subject",
    notes: "/notes",
  };

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });

    const clearTranscriptInterval = setInterval(() => {
      resetTranscript();
    }, 10000);

    return () => {
      SpeechRecognition.stopListening();
      clearInterval(clearTranscriptInterval);
    };
  }, [resetTranscript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  let redirect = "";

  if (redirectUrl) {
    if (pages.includes(redirectUrl)) {
      redirect = <Navigate to={urls[redirectUrl]} />;
    } else {
      redirect = <p>Could not find page: {redirectUrl}</p>;
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/subject" element={<SubjectPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/chapter" element={<Chapter />} />
          <Route path="/test" element={<TestDataDisplay />} />
          <Route path="/subject/english" element={<English />} />
        </Routes>
        {redirect}
      </BrowserRouter>

      <p id="transcript">Transcript: {transcript}</p>
    </div>
  );
}

export default App;
