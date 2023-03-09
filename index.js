import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import fileRouter from "./routes/file.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use("/file", fileRouter);

const connection = mongoose.connection;
connection.once("connected", () => console.log("Database Connected ~"));
connection.on("error", (error) => console.log("Database Error: ", error));
mongoose.connect("mongodb://127.0.0.1:27017/db", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.listen(2022, () => console.log("Server Started ~"));
