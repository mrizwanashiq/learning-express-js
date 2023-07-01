import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "../routes/user.js";

export const startServer = () => {
	const app = express();
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());
	app.use("/users", userRouter);
	return app;
};

export const mongooseLoader = async (url) => {
	const connection = mongoose.connection;
	connection.once("connected", () => console.log("Database Connected ~"));
	connection.on("error", (error) => console.log("Database Error: ", error));
	mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};
export const mongooseUnloader = async () => {
	await mongoose.disconnect();
	console.log("Database Disconnected ~");
};
