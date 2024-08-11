import React, { useState } from 'react';
import './Flashcard.css';

function Flashcard({ flashcard, updateConfidence }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [confidence, setConfidence] = useState(flashcard.confidence_score);

  const handleConfidenceChange = (newScore) => {
    setConfidence(newScore);
    updateConfidence(flashcard.id, newScore);
  };

  if (!flashcard) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flashcard-container" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
        <div className="content front">
          <p>{flashcard.question}</p>
        </div>
        <div className="content back">
          <h1><p>{flashcard.answer}</p></h1>
          <div className="confidence-rating">
            <span>Rate your confidence:</span>
            {[1, 2, 3, 4, 5].map(score => (
              <button key={score} onClick={() => handleConfidenceChange(score)}>
                {score} ⭐
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
