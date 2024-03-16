import React, { useState } from "react";

const Chapter = () => {
  const [userInput, setUserInput] = useState("what is the capital of spain?");
  const [response, setResponse] = useState("");

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPEN_API_KEY}`,
    },
    body: JSON.stringify({
      messages: [{ role: "system", content: userInput }],
      model: "gpt-3.5-turbo", // specify the model heregit
      max_tokens: 4000,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      setResponse(data.choices[0].message.content);
    }) // This should log the API response
    .catch((error) => console.log(error)); // This should log any errors

  return (
    <div>
      <h1>This is chapter</h1>
      {userInput}
      <br />
      {response}
    </div>
  );
};

export default Chapter;
