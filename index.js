import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import mongoose from "mongoose"
import bookRouter from "./routes/book.js";

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

const connection = mongoose.connection
connection.once("connected", () => console.log("Database Connected ~"))
connection.on("error", error => console.log("Database Error: ", error))
mongoose.connect("mongodb://localhost:27017/my_first_data_base", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use("/book", bookRouter);

app.listen(3000, () => console.log("Server Started ~"));