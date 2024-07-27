/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaTwitter } from "react-icons/fa";
import "../styles/QuoteBox.css";

const QuoteBox = () => {
  const [text, settext] = useState("");
  const [author, setAuthor] = useState("");

  const handleNewQuote = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex];
        settext(randomQuote.text);
        setAuthor(randomQuote.author);
      }
    } catch (error) {
      console.log("data not found:", error);
    }
  };

  useEffect(() => {
    handleNewQuote();
  }, []);

  const tweetUrl = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
    `"${text}" - ${author}`
  )}`;
  return (
    <div id="quote-box">
      <div id="text">{text}</div>
      <div id="author">-{author}</div>
      <div id="button-container">
        <a id="tweet-quote" href={tweetUrl} target="_blank">
          <FaTwitter size={30} />
        </a>
        <button id="new-quote" onClick={handleNewQuote}>
          New Quote
        </button>
      </div>
    </div>
  );
};
export default QuoteBox;
