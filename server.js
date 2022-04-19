// declare dependencies
const express = require('express');
const uniqid = require('uniqid');
let noteDB = require('./db/db.json')
const app = express();
// set port
const PORT = process.env.PORT || 3000;

// set up middleware
// parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
// parse incoming data to json
app.use(express.json());

app.get('/api/notes', (req, res) => {
    res.json(noteDB)
})

app.post('/api/notes', (req, res) => {
    req.body.id = uniqid();
    const newNote = createNewNote(req.body, noteDB)
    res.json(req.body)
})

function createNewNote(body, noteArray){
    const newNote = body;
    noteArray.push(newNote)
    return newNote
}

app.listen(PORT, () => {
    console.log(`API now on port ${PORT}!`)
})

