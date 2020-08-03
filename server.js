// dependecies

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//read db.JSON file
app.get("./api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utgf8", (err, result) => {
        if (err) throw err;
        return res.json(JSON.parse(result));
    })
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});


app.listen(port, () => {
    console.log("App listening on PORT " + port);
})