import React, { useState, useCallback, useEffect } from "react";

import Card from "./Card.js";
import Reset from "./Reset.js";
import Footer from "./Footer.js";
import "../css/Game.css";

export default function Game() {
  const [letters, setLetters] = useState([
    { letter: "A", id: 0, flipped: false, source: "static/illinois.png" },
    { letter: "A", id: 1, flipped: false, source: "static/illinois.png" },
    { letter: "B", id: 2, flipped: false, source: "static/indiana.png" },
    { letter: "B", id: 3, flipped: false, source: "static/indiana.png" },
    { letter: "C", id: 4, flipped: false, source: "static/iowa.png" },
    { letter: "C", id: 5, flipped: false, source: "static/iowa.png" },
    { letter: "D", id: 6, flipped: false, source: "static/michigan.png" },
    { letter: "D", id: 7, flipped: false, source: "static/michigan.png" },
    { letter: "E", id: 8, flipped: false, source: "static/msu.png" },
    { letter: "E", id: 9, flipped: false, source: "static/msu.png" },
    { letter: "F", id: 10, flipped: false, source: "static/northwestern.png" },
    { letter: "F", id: 11, flipped: false, source: "static/northwestern.png" },
    { letter: "G", id: 12, flipped: false, source: "static/psu.png" },
    { letter: "G", id: 13, flipped: false, source: "static/psu.png" },
    { letter: "H", id: 14, flipped: false, source: "static/wisco.png" },
    { letter: "H", id: 15, flipped: false, source: "static/wisco.png" },
  ]);
  const [flipped, setFlipped] = useState([]);
  const [invisible, setInvisible] = useState([]);
  const [moves, setMoves] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [lowScore, setLowScore] = useState(
    localStorage.getItem("matching-low-score")
  );

  // Helper function to shuffle the board
  const shuffle = () => {
    let array = letters.slice(0);
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    setLetters(array);
  };

  // Helper function to handle comparing 2 flipped cards
  const handleFlip = (id) => {
    // set letters flipped to correct state
    if (flipped.length === 2) {
      //  click should do nothing if 2 cards already flipped
      return;
    }
    // Find the index of the id we have
    const idx = letters.findIndex((item) => item.id === id);
    const tempArr = letters.slice(0);
    tempArr[idx].flipped = true;
    setLetters(tempArr);
    if (flipped.length === 0) {
      // save first flipped card
      setFlipped([idx]);
    } else if (flipped.length === 1) {
      if (flipped[0] === idx) {
        return; // do nothing if clicked same card
      }
      // compare cards and act accordingly
      setFlipped((prevState) => {
        return [...prevState, idx];
      }); // set flipped length to 2 for logic purposes
      if (letters[flipped[0]].letter === letters[idx].letter) {
        // if letters are same, remove cards
        setTimeout(() => {
          setInvisible((prevState) => {
            return [...prevState, letters[flipped[0]].id, id];
          });
          setFlipped([]);
        }, 1000);
      } else {
        // cards dont match
        setTimeout(() => {
          const tempArr = letters.slice(0);
          tempArr[idx].flipped = false;
          tempArr[flipped[0]].flipped = false;
          setLetters(tempArr);
          setFlipped([]);
        }, 900);
      }
      setTimeout(() => {
        setMoves((prevState) => {
          return prevState + 1;
        });
      }, 100);
    }
  };

  // Helper function to reset the board
  const handleReset = () => {
    if (invisible.length >= 16) {
      // Handle High score if game is complete
      if (moves < lowScore) {
        localStorage.setItem("matching-low-score", moves);
        setLowScore(moves);
      }
    }

    console.log("reset");
    const tempArr = letters.slice(0);
    for (let i = 0; i < tempArr.length; ++i) {
      tempArr[i].flipped = false;
    }
    setLetters(tempArr);
    shuffle(letters);
    setTimeout(() => {
      setInvisible([]);
      setMoves(0);
    }, 80);
  };

  if (!mounted) {
    shuffle();
    setMounted(true);
  }
  const cards = letters.map((item) => {
    return (
      <Card
        key={item.id}
        invisibleArr={invisible}
        letter={item.letter}
        id={item.id}
        flipped={item.flipped}
        handleFlip={handleFlip}
        source={item.source}
      />
    );
  });

  if (invisible.length >= 16) {
    return (
      <div className="endscreen">
        <p>You matched them all in {moves} moves!</p>
        <Reset reset={handleReset} />
      </div>
    );
  }

  return (
    <div>
      <div className="game-wrapper">{cards}</div>
      <Footer reset={handleReset} moves={moves} lowScore={lowScore} />
    </div>
  );
}
