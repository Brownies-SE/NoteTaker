const express = require("express");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
