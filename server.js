// declare dependencies
const fs = require('fs');
const path = require('path');
const express = require('express');
const uniqid = require('uniqid');
let noteDB = require('./db/db.json');

// instantiate the server
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
    // add an unique id to new note
    req.body.id=uniqid();
    const newNote= createNewNote(req.body,noteDB)
    res.json(noteDB)
});

// function to push new note and add to note database
function createNewNote(body, noteArray){
    const newNote = body;
    noteArray.push(newNote) 
    fs.writeFileSync('./db/db.json',JSON.stringify(noteDB))
    return newNote
};

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, ("public/notes.html")));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, ("./public/index.html")));
});

app.listen(PORT, () => {
    console.log(`API now on port ${PORT}!`)
});

