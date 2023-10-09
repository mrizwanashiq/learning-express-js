import express from "express";
import Course from "../models/course.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const courses = await Course.find();
		res.status(200).json(courses);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const course = await Course.create(req.body);
		res.status(201).json(course);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
});

export default router;
