import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import UserModel from "./models/user.js";
import validate from "./middlewares/validate.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mongoose.connection;
connection.once("connected", () => console.log("Database Connected ~"));
connection.on("error", (error) => console.log("Database Error: ", error));
mongoose.connect("mongodb://localhost:27017/express-validation", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.post("/register", validate(UserModel), async (req, res) => {
	try {
		const user = await UserModel.create(req.body);
		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.listen(2000, () => console.log("Server Started ~"));
