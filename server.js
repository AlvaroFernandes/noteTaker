// dependecies

const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

const notes = []

//read db.JSON file
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, result) => {
        if (err) throw err;
        return res.json(JSON.parse(result));
    })
});

// insert note on db.JSON
app.post("/api/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', function(err, data) {
        const createNote = req.body;
        createNote.id = uniqid();
        notes.push(createNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes), function(err) {
            if (err) throw err;
            console.log('note saved');
        });
        res.json(createNote);
    })
});

//Delete note on db.JSON
app.delete("/api/notes/:id", (req, res) => {
    const selected = req.params.id;
    fs.readFile('./db/db.json', 'utf8', function(err, data) {
        let noteList = JSON.parse(data);
        for (let i = 0; i < noteList.length; i++) {
            if (noteList[i].id == chosen) {
                noteList.splice(i, 1);
                fs.writeFile('./db/db.json', JSON.stringify(noteList), function(err) {
                    if (err) throw err;
                    res.send(noteList);
                });
            }
        }

    });
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});


app.listen(port, () => {
    console.log("App listening on PORT " + port);
})