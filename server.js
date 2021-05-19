const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;

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

app.get("api/notes", (req, res) =>
  fs.readFile(
    path.join(__dirname, "./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const parsedData = JSON.parse(data);
        res.sendFile(parsedData);
      }
    })
  )
);
//Listen on PORT 8080
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
