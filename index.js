const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.set("view engine",'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts');
app.set('views', path.join(__dirname, '/views'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const connection = mongoose.connection
connection.once("connected", () => console.log("Database Connected ~"))
connection.on("error", error => console.log("Database Error: ", error))
mongoose.connect("mongodb://localhost:27017/express-jwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const book = require("./routes/book");
app.use("/book", book);


app.listen(3001,function (){
    console.log("Listening at 3000")
});