const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/flashcards', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/flashcards', (req, res) => {
  const { question, answer } = req.body;
  db.query('INSERT INTO flashcards (question, answer, confidence_score) VALUES (?, ?, 3)', [question, answer], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, question, answer, confidence_score: 3 });
  });
});

app.delete('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM flashcards WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.post('/api/flashcards/:id/confidence', (req, res) => {
  const { id } = req.params;
  const { confidence_score } = req.body;
  db.query('UPDATE flashcards SET confidence_score = ? WHERE id = ?', [confidence_score, id], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
