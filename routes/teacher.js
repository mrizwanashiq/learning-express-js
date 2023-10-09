import express from "express";
import Teacher from "../models/teacher.js";

const router = express.Router();

// This API will return all the teachers (simple record without any join)
router.get("/", async (req, res) => {
	try {
		const teachers = await Teacher.find();
		res.status(200).json(teachers);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

// This API will return all the courses of a teacher
router.get("/courses", async (req, res) => {
	try {
		const teachers = await Teacher.aggregate([
			{
				$lookup: {
					from: "courses",
					localField: "_id",
					foreignField: "teacher",
					as: "courses",
				},
			},
		]);
		res.status(200).json(teachers);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

// This API will return all the students of a teacher
router.get("/students", async (req, res) => {
	try {
		// get all the teachers teaches students
		const teachers = await Teacher.aggregate([
			{
				$lookup: {
					from: "courses",
					localField: "_id",
					foreignField: "teacher",
					as: "courses",
				},
			},
			{
				$unwind: "$courses",
			},
			{
				$lookup: {
					from: "students",
					localField: "courses._id",
					foreignField: "courses",
					as: "students",
				},
			},
		]);
		res.status(200).json(teachers);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

// This API will create a new teacher
router.post("/", async (req, res) => {
	try {
		const teacher = await Teacher.create(req.body);
		res.status(201).json(teacher);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
});

export default router;
