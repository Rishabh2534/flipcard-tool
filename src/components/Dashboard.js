import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [flashcards, setFlashcards] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/flashcards')
      .then(response => response.json())
      .then(data => setFlashcards(data));
  }, []);

  const addFlashcard = () => {
    fetch('http://localhost:5000/api/flashcards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCard),
    })
      .then(response => response.json())
      .then(data => setFlashcards([...flashcards, data]));

    setNewCard({ question: '', answer: '' });
  };

  const deleteFlashcard = (id) => {
    fetch(`http://localhost:5000/api/flashcards/${id}`, { method: 'DELETE' })
      .then(() => setFlashcards(flashcards.filter(card => card.id !== id)));
  };

  return (
    <div>
      <h2>Manage Flashcards</h2>
      <input
        placeholder="Question"
        value={newCard.question}
        onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
      />
      <input
        placeholder="Answer"
        value={newCard.answer}
        onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
      />
      <button onClick={addFlashcard}>Add Flashcard</button>

      <ul>
        {flashcards.map(card => (
          <li key={card.id}>
            {card.question} - {card.answer}
            <button onClick={() => deleteFlashcard(card.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
