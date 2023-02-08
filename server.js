const express = require('express'); // Requires the express npm package
const app = express(); 
const path = require('path'); // Required to write items to the db.json file
const fs = require('fs');
const {v4: uuid} = require('uuid'); // Requires the uuid npm package to create a unique id that can be used to delete items from the array of objects from db.json

const PORT = process.env.PORT || 3200 // The required PORT for using this application
const dbPath = path.join('db', 'db.json'); 
let notes = fs.readFileSync(dbPath, {encoding: 'UTF8'}); 
notes = JSON.parse(notes);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => { 
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    newNote.id = uuid();
    notes.push(newNote);
    fs.writeFileSync(dbPath, JSON.stringify(notes));
    res.json(notes);
});

app.put('/api/notes/:id', (req, res) => {
    let noteId = req.params.id;
    let updatedNote = req.body;
    notes[noteId] = updatedNote;
    fs.writeFileSync(dbPath, JSON.stringify(notes));
    res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
    let noteId = req.params.id;
    notes.splice(noteId, 1);
    fs.writeFileSync(dbPath, JSON.stringify(notes));
    res.json(notes);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Now listening at http://localhost:${PORT}`)
});