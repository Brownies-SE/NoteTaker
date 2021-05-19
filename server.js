const express = require("express");

const app = express();
const PORT = 8080;

//Since this is true; we can post nested objects and parse with qs library
app.use(express.urlencoded({ extended: true }));

//parse the application into JSON
app.use(express.json());

//Allows us access to the public folder
app.use(express.static("public"));

//Routes
require("./routes");

//Listen on PORT 8080
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
