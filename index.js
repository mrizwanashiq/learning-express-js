import express from "express";
import mongoose from "mongoose";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use("/", routes);

mongoose.connect("mongodb://localhost:27017/college", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.listen(5000, () => {
	console.log("Server is running on port 5000");
});