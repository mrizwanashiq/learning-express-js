import express from "express";
const router = express.Router();
import book from "../models/book.js";

router.get("/", async (req, res) => {
    const result = await book.find();
    res.status(200).json(result);
})

router.post("/", async (req, res) => {
    const result = await book.create(req.body);
    res.status(200).json(result);
})

export default router;