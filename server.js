const express = require('express');
const app = express();
let noteDB = require('./db/db.json')

app.get('/api/notes', (req, res) => {
    res.json(noteDB)
})

app.listen(3000, () => {
    console.log('API on port 3000!')
})