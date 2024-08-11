import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';

function AdaptiveLearning() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/flashcards')
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const sortedFlashcards = data.sort((a, b) => a.confidence_score - b.confidence_score);
          setFlashcards(sortedFlashcards);
        }
      });
  }, []);

  const nextCard = () => setCurrentIndex((currentIndex + 1) % flashcards.length);
  const prevCard = () => setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);

  const updateConfidence = (id, confidence_score) => {
    fetch(`http://localhost:5000/api/flashcards/${id}/confidence`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ confidence_score }),
    });

    const updatedFlashcards = flashcards.map(card =>
      card.id === id ? { ...card, confidence_score } : card
    ).sort((a, b) => a.confidence_score - b.confidence_score);

    setFlashcards(updatedFlashcards);
  };

  if (flashcards.length === 0) {
    return <div>No flashcards available</div>;
  }

  return (
    <div>
      <Flashcard flashcard={flashcards[currentIndex]} updateConfidence={updateConfidence} />
      <button onClick={prevCard}>Previous</button>
      <button onClick={nextCard}>Next</button>
    </div>
  );
}

export default AdaptiveLearning;
