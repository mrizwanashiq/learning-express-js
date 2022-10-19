import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import mongoose from "mongoose"
import userRouter from "./routes/user.js";

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use(cors());
app.use("/user", userRouter);

const connection = mongoose.connection
connection.once("connected", () => console.log("Database Connected ~"))
connection.on("error", error => console.log("Database Error: ", error))
mongoose.connect('mongodb://localhost:27017/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.listen(2022, () => console.log("Server Started ~"));