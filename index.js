/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const object = {
  name: "adnan",
  age: function () {
    return 10 + 20;
  },
  Class: "BS(IT)",
  City: "Rahim Yar Khan",

  education: [{ year: 2022 }, { year: 12 }],
};
app.get("/", (req, res) => {
  res.status(200).send(object);
});

app.listen(8080);
