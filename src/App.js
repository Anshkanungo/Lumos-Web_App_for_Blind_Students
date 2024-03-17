import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home";
import SubjectPage from "./components/Subject";
import NotesPage from "./components/Notes";
import Chapter from "./components/Chapter";
import TestDataDisplay from "./components/Test";
import English from "./components/English";
import Meto from "./components/Meto";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subject" element={<SubjectPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/chapter" element={<Chapter />} />
          <Route path="/test" element={<TestDataDisplay />} />
          <Route path="/subject/english" element={<English />} />
          <Route path="/meto" element={<Meto />} />

          <Route path="/english" element={<English />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
