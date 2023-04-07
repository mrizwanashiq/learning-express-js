import express from "express";
import expressLayouts from "express-ejs-layouts";
import mongoose from "mongoose";
import book from "./routes/book.js";

const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mongoose.connection;
connection.once("connected", () => console.log("Database Connected ~"));
connection.on("error", (error) => console.log("Database Error: ", error));
mongoose.connect("mongodb://127.0.0.1:27017/express-ejs", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(book);

app.listen(3000, function () {
	console.log("Listening at 3000");
});
