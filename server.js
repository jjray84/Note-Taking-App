const express = require('express');
const app = express();
const PORT = 3001;
const path = require('path');
let notes = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Now listening at http://localhost:${PORT}`)
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    notes.push(newNote);
    res.json(notes);
});

app.put('/api/notes/:id', (req, res) => {
    let noteId = req.params.id;
    let updatedNote = req.body;
    notes[noteId] = updatedNote;
    res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
    let noteId = req.params.id;
    notes.splice(noteId, 1);
    res.json(notes);
});
