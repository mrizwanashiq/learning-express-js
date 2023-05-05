import express from "express";
import mongoose from "mongoose";
import bookRouter from "./routes/book.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/my_first_data_base", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("connected", () => console.log("Database Connected ~"));
connection.on("error", (error) => console.log("Database Error: ", error));

app.use("/book", bookRouter);

app.listen(3000, () => console.log("Server Started ~"));
