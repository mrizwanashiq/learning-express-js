import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
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
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
