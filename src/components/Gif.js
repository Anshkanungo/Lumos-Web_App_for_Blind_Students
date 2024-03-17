import React from "react";

const Gif = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "blue",
      }}
    >
      <iframe
        src="https://giphy.com/embed/QWuiEMzA0iTzj81eCE"
        width="100%"
        height="100%"
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Gif;
