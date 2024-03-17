import React, { useState } from "react";
import TestDataDisplay from "./Test";
import { Speak } from "./speechUtils";
import { useNavigate } from "react-router-dom";

const Chapter = () => {
  const [userInput, setUserInput] = useState(
    "can you briefly explain the simplified version of this text?"
  );
  const [response, setResponse] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [contentChunks, setContentChunks] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [selectedChunks, setSelectedChunks] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [data, setData] = useState("");

  const handleDataFetched = (data) => {
    setFileContent(data);
    const chunks = data
      .split(/\.\s*/g)
      .filter(Boolean)
      .map((chunk) => `${chunk}.`);
    setContentChunks(chunks);
  };

  const handleBack = async () => {
    try {
      const resultString = result.join("\\n"); // Convert the array to a string with newlines
      const response = await fetch(
        `${process.env.REACT_APP_OPEN_API}save-file`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: resultString,
        }
      );

      if (response.ok) {
        console.log("File saved successfully on the server.");
      } else {
        console.error("Error saving file on the server.");
      }
    } catch (error) {
      console.error("Error saving file:", error);
    }
    navigator.vibrate([200]);
    navigate(-1);
  };

  const handlePrev = () => {
    if (highlightedIndex > 0) {
      const prevChunk = contentChunks[highlightedIndex - 1];
      Speak(prevChunk); // Speak the current chunk
      setHighlightedIndex(highlightedIndex - 1);
      if (selectMode) {
        setSelectedChunks((prevSelectedChunks) =>
          prevSelectedChunks.slice(0, highlightedIndex)
        );
      }
    }
    navigator.vibrate([200]);
  };

  const handleNext = () => {
    if (highlightedIndex < contentChunks.length - 1) {
      const nextChunk = contentChunks[highlightedIndex + 1];
      Speak(nextChunk); // Speak the current chunk
      setHighlightedIndex(highlightedIndex + 1);
      if (selectMode) {
        setSelectedChunks((prevSelectedChunks) => [
          ...prevSelectedChunks,
          nextChunk,
        ]);
      }
    }
    navigator.vibrate([300]);
  };

  const handleSelect = () => {
    setSelectMode(!selectMode);
    if (selectMode) {
      setSelectedChunks([]);
    } else {
      setSelectedChunks([contentChunks[highlightedIndex]]);
    }
    navigator.vibrate([600]);
  };

  const handle = () => {
    navigator.vibrate([500]);
  };

  const handleMeta = () => {
    const selectedText = selectedChunks.join(" ");
    var newInput = `${userInput} ${selectedText}`;
    setSelectedChunks([]);
    setSelectMode(false);
    console.log("user input", userInput);
    console.log("new input", newInput);
    fetchOpenAIResponse(newInput);
    setUserInput(newInput);
    navigator.vibrate([700]);
    setUserInput("");
    newInput = "";
  };

  const fetchOpenAIResponse = (input) => {
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPEN_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [{ role: "system", content: input }],
        model: "gpt-3.5-turbo",
        max_tokens: 4000,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const responseData = data.choices[0].message.content;
        setResult((prevResult) => [...prevResult, responseData]); // Update result state with new data
        console.log("Result array:", result); // Log the result array to check if it has content
        setResponse(responseData);
        Speak(responseData);
      })
      .catch((error) => console.log(error));
  };

  const renderContent = () => {
    return fileContent.split(/\n/).map((line, index) => (
      <div key={index}>
        {line.split(/\.\s*/).map((chunk, chunkIndex) => (
          <span
            key={`${index}-${chunkIndex}`}
            style={{
              backgroundColor:
                contentChunks[highlightedIndex] === `${chunk}.`
                  ? "green"
                  : selectedChunks.includes(`${chunk}.`)
                  ? "lightgreen"
                  : "transparent",
            }}
          >
            {chunk}
            {chunkIndex !== line.split(/\.\s*/).length - 1 && "."}
          </span>
        ))}
        <br />
      </div>
    ));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: "1", overflowY: "auto" }}>
        <div style={{ height: "50vh", overflowY: "auto" }}>
          <h1>This is chapter</h1>
          <TestDataDisplay onDataFetched={handleDataFetched} />
          <div>
            <h2>User Input</h2>
            {userInput}
          </div>
          <div>
            <h2>API Response</h2>
            {response}
          </div>
          <div>
            <h2>File Content</h2>
            {renderContent()}
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
          <button
            style={{ width: "100%", height: "15vh" }}
            onClick={handlePrev}
          >
            Prev
          </button>
        </div>
        <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
          <button
            style={{ width: "100%", height: "15vh" }}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
        <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
          <button
            style={{ width: "100%", height: "15vh" }}
            onClick={handleSelect}
          >
            {selectMode ? "Deselect" : "Select"}
          </button>
        </div>
        <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
          <button
            style={{ width: "100%", height: "15vh" }}
            onClick={handleMeta}
          >
            Meta
          </button>
        </div>
        <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
          <button
            style={{ width: "100%", height: "15vh" }}
            onClick={handleBack}
          >
            back
          </button>
        </div>
        <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
          <button style={{ width: "100%", height: "15vh" }} onClick={handle}>
            speak
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chapter;
