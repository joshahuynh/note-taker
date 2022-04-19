const express = require('express');
const app = express();
let noteDB = require('./db/db.json')
const PORT = process.env.PORT || 3000;

app.get('/api/notes', (req, res) => {
    res.json(noteDB)
})

app.listen(PORT, () => {
    console.log(`API now on port ${PORT}!`)
})