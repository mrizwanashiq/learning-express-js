import mongoose from "mongoose";
const schema = mongoose.Schema({
	name: { type: String, required: true },
});
export default mongoose.model("Book", schema);
