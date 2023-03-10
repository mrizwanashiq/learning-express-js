import express from "express";
const router = express.Router();
import userModel from "../models/user.js";
import validate from "../middlewares/validate.js";

router.post("/register", validate(userModel), async (req, res) => {
	try {
		const user = await userModel.create(req.body);
		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

export default router;
