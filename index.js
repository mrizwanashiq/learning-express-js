/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json())

const database = []
app.post("/register", (req, res) => {
  let flag = false;
  for (let i = 0; i < database.length; i++) {
    if (req.body.email == database[i].email) {
      flag = true;
    }
  }

  if (flag) {
    res.status(400).json({ message: "Duplication Email" })
  } else {
    database.push(req.body)
    res.status(200).json({ message: "You have registered successfully" })
  }
});

app.listen(8080);
