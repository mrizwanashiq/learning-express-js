import express from "express";
const router = express.Router();
import authenticate from "../middlewares/authenticate.js";
import validation from "../middlewares/validation.js";
import schema from '../validations/user.validations.js'
import Service from "../services/user.js"

router.get("/", async (req, res) => {
    try {
        const data = await Service.getAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const data = await Service.getById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post("/", validation(schema.add.body, 'body'), async (req, res) => {
    try {
        const data = await Service.add(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(error.status).send(message);
    }
})

router.patch("/:id", validation(schema.update.body, 'body'), async (req, res) => {
    try {
        const data = await Service.update({ ...req.params, ...req.body });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const data = await Service.delete(req.params.id);
        res.status(204).json(data);
    } catch (error) {
        res.status(500).send(error);
    }
})

export default router;
