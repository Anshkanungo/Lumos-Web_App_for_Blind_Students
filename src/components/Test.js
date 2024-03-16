import { useState, useEffect } from "react";

function TestDataDisplay({ onDataFetched }) {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("test.txt")
      .then((response) => response.text())
      .then((text) => {
        setData(text);
        onDataFetched(text); // Call the onDataFetched prop with the fetched data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return null; // Return null since you don't need to render anything in this component
}

export default TestDataDisplay;
