import express from "express";
const router = express.Router();
import book from "../models/book.js";

router.get("/", async (req, res) => {
    const result = await book.find();
    res.status(200).json(result);
})

router.get("/:id", async (req, res) => {
    const result = await book.findById(req.params.id);
    res.status(200).json(result);
})

router.post("/", async (req, res) => {
    const result = await book.create(req.body);
    res.status(200).json(result);
})

router.patch("/:id", async (req, res) => {
    const result = await book.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(result);
})

router.delete("/:id", async (req, res) => {
    const result = await book.findByIdAndDelete(req.params.id);
    res.status(200).json(result);
})

export default router;
