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
app.use(express.static('public'));
// parse incoming data to json
app.use(express.json());

// get note api
app.get('/api/notes', (req, res) => {
    res.json(noteDB)
})

// post note api
app.post('/api/notes', (req, res) => {
    // add an unique id to new note
    req.body.id=uniqid();
    const newNote = req.body
    noteDB.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(noteDB))
    res.json(noteDB)
});

// delete note api
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    noteDB = noteDB.filter(notes => 
        notes.id !== id)
    
    fs.writeFileSync('./db/db.json', JSON.stringify(noteDB))
    res.json(noteDB)
})

// upload html pages
app.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname, ("public/notes.html")));
});

// wildcard pathway
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, ('./public/index.html')));
})

// server listener
app.listen(PORT, () => {
    console.log(`API now on port ${PORT}!`)
});

