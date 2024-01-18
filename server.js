const express = require('express');
const path = require('path');
const fs = require('fs');
const ShortUniqueId = require('short-unique-id');
const notes = require("./db/db.json");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// POST request for notes
app.post('/api/notes', (req, res) => {
  //Add new note
  const uid = new ShortUniqueId();
  const id = uid.rnd()
  notes.push({id, ...req.body});
  
  //Re-write existing notes
    fs.writeFile(`./db/db.json`, JSON.stringify(notes), (err) =>
      err
        ? console.error(err)
        : res.json(notes)
    );

});

app.listen(process.env.PORT)
