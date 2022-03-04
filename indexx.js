const express = require('express');
const app = express();

app.get('/getname/', function (req, res) {
  res.status(200).send('Hello Adnan!');
});
app.get('/getclass/', function (req, res) {
  res.status(200).send('Hello bsit!');
});
app.get('/getcity/', function (req, res) {
  res.status(200).send('Hello ryk!');
});

const port = process.env.PORT || 2022;

const server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});