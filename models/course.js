import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	is_active: {
		type: Boolean,
		default: true,
	},
	teacher: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Teacher",
	},
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
