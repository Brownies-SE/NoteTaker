const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

let info = [];

//Since this is true; we can post nested objects and parse with qs library
app.use(express.urlencoded({ extended: true }));

//parse the application into JSON
app.use(express.json());

//Allows us access to the public folder
app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("/api/notes", function (err, res) {
  try {
    // Get the information from the db folder
    info = fs.readFileSync("./db/db.json", "utf8");
    // parse it so info is an array of objects
    info = JSON.parse(info);

    // error handling for the try catch
  } catch (err) {
    console.log("error");
  }
  // respond by sending thr objects
  res.json(info);
});

app.post("/api/notes", function (req, res) {
  try {
    // reads the json file
    info = fs.readFileSync("./db/db.json", "utf8");
    console.log(info);

    // parse the data to get an array of objects
    info = JSON.parse(info);
    // Set new notes id
    req.body.id = info.length;
    // add the new note to the array of note objects
    info.push(req.body);
    // create a string so you can write it to the file
    info = JSON.stringify(info);
    // writes the new note to file
    fs.writeFile("./db/db.json", info, "utf8", function (err) {});
    // respond by sending everything to the browser and making it JSON format again
    res.json(JSON.parse(info));
  } catch (err) {
    console.log("error");
  }
});

//Listen on PORT 8080
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
