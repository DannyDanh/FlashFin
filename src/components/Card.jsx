import React, { useState } from "react";


const Card = ({ question, answer, difficulty, isFlipped, setIsFlipped}) => {
  // const [flipped, setFlipped] = useState(false);

  return (
    <div className="card-scene">
      <div
        className={`card-box ${isFlipped ? "flipped" : ""} ${difficulty}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="card-face front">
          <p>{question}</p>
        </div>
        <div className="card-face back">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
