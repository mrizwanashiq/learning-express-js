import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	is_active: {
		type: Boolean,
		default: true,
	},
	courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
