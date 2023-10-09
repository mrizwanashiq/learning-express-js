import express from "express";
import Student from "../models/student.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const students = await Student.aggregate([
			{
				$lookup: {
					from: "courses",
					localField: "courses",
					foreignField: "_id",
					pipeline: [
						{
							$lookup: {
								from: "teachers",
								localField: "teacher",
								foreignField: "_id",
								as: "teacher",
							},
						},
					],
					as: "courses",
				},
			},
		]);
		res.status(200).json(students);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const student = await Student.create(req.body);
		res.status(201).json(student);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
});

export default router;
