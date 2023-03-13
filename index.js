import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use("/user", userRouter);

const connection = mongoose.connection;
connection.once("connected", () => console.log("Database Connected ~"));
connection.on("error", (error) => console.log("Database Error: ", error));
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.listen(3000, () => console.log("Server Started ~"));
