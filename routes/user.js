import express from "express";
const router = express.Router();
import userModel from "../models/user.js";
import authenticate from "../middlewares/authenticate.js";
import jwt from "jsonwebtoken";
import validate from "../middlewares/validate.js";
import schema from "../validations/user.validation.js";

router.get("/", authenticate, async (req, res) => {
	try {
		const users = await userModel.find();
		res.send(users);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get(
	"/:id",
	authenticate,
	validate(schema.id.params),
	async (req, res) => {
		try {
			const user = await userModel.findById(req.params.id);
			res.send(user);
		} catch (error) {
			res.status(500).send(error);
		}
	}
);

router.post("/register", validate(schema.register.body), async (req, res) => {
	try {
		const user = await userModel.create(req.body);
		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post("/login", validate(schema.login.body), async (req, res) => {
	try {
		const user = await userModel.findOne({
			email: req.body.email,
			password: req.body.password,
		});
		if (!user) return res.status(401).send("Invalid email or password.");
		const token = jwt.sign({ id: user._id }, "my_temporary_secret", {
			expiresIn: "1h",
		});
		res.send(token);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.patch(
	"/:id",
	authenticate,
	validate(schema.update.params),
	validate(schema.update.body),
	async (req, res) => {
		try {
			const user = await userModel.findByIdAndUpdate(req.params.id, req.body);
			res.send(user);
		} catch (error) {
			res.status(500).send(error);
		}
	}
);

router.delete(
	"/:id",
	authenticate,
	validate(schema.id.params),
	async (req, res) => {
		try {
			const user = await userModel.findByIdAndDelete(req.params.id);
			res.send(user);
		} catch (error) {
			res.status(500).send(error);
		}
	}
);

export default router;
