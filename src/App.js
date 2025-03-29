import React, { useState, useEffect } from "react";
import "./App.css";

const words = ["javascript", "react", "programming", "developer", "frontend","coder","computer", "program", "code", "debug", "bug", "error", "loop", "variable", "function", "array",  
  "list", "object", "class", "if_else", "while", "for", "print", "input", "data", "database",  
  "server", "client", "network", "website", "HTML", "CSS", "JavaScript", "React", "Node.js", "API",  
  "frontend", "backend", "fullstack", "button", "form", "click", "login", "password", "storage", "Python",  
  "Java", "C++", "Git", "GitHub", "host", "domain", "link", "page", "style", "design"];
const shuffleWord = (word) => word.split("").sort(() => Math.random() - 0.5).join("");
const bgColors = ["#FF5733", "#33FF57", "#5733FF", "#FFC300", "#33FFF5"];

function WordScramble() {
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [scrambledWord, setScrambledWord] = useState(shuffleWord(word));
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [bgColor, setBgColor] = useState(bgColors[0]);
  const [showAnswer, setShowAnswer] = useState(false); 

  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor(bgColors[Math.floor(Math.random() * bgColors.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => setInput(e.target.value);

  const checkAnswer = () => {
    if (lives > 0) {
      if (input.toLowerCase() === word.toLowerCase()) {
        setMessage("🎉 Correct!");
        setScore(score + 1);
        setShowAnswer(false);
        getNewWord();
      } else {
        setMessage("❌ Wrong! The correct word was:");
        setShowAnswer(true);
        setLives(lives - 1);
      }
    }
  };

  const getNewWord = () => {
    if (lives > 0) {
      const newWord = words[Math.floor(Math.random() * words.length)];
      setWord(newWord);
      setScrambledWord(shuffleWord(newWord));
      setInput("");
      setMessage("");
      setShowAnswer(false);
    }
  };

  const restartGame = () => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setScrambledWord(shuffleWord(word));
    setInput("");
    setMessage("");
    setScore(0);
    setLives(3);
    setShowAnswer(false);
  };

  return (
    <div className="container" style={{ backgroundColor: bgColor }}>
      <div className="game-card">
        <h1 className="title">Word Scramble Game</h1>
        <p className="instruction">Unscramble this word:</p>
        <h2 className="scrambled">{scrambledWord}</h2>

        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Your answer..."
          className="input-box"
          disabled={lives === 0}
        />

        <div className="buttons">
          <button className="btn check" onClick={checkAnswer} disabled={lives === 0}>
            Check
          </button>
          <button className="btn new-word" onClick={getNewWord} disabled={lives === 0}>
            New Word
          </button>
        </div>

        <p className={`message ${message.includes("Correct") ? "correct" : "wrong"}`}>{message}</p>
        {showAnswer && <p className="correct-answer">{word}</p>}

        <h3 className="score">Score: {score}</h3>

        <div className="lives-container">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`tetris-block ${i < lives ? "filled" : "empty"}`}></div>
          ))}
        </div>

        {lives === 0 && (
          <>
            <h2 className="game-over">Game Over! The correct word was: <span className="final-answer">{word}</span></h2>
            <button className="btn restart" onClick={restartGame}>Restart Game</button>
          </>
        )}
      </div>
    </div>
  );
}

export default WordScramble;
