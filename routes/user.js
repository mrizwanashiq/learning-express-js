import express from "express";
const router = express.Router();
import authenticate from "../middlewares/authenticate.js";
import validation from "../middlewares/validation.js";
import schema from '../validations/user.validations.js'
import Service from "../services/user.js"

router.get("/", authenticate, async (req, res) => {
    try {
        const data = await Service.get();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get("/:id", authenticate, async (req, res) => {
    try {
        const data = await Service.getById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post("/register", validation(schema.register.body, 'body'), async (req, res) => {
    // try {
    const data = await Service.register(req.body);
    res.status(200).json(data);
    // } catch (error) {
    //     // res.status(error.status).send(error.message);
    //     res.send(error);
    // }
})

router.post("/login", validation(schema.login.body, 'body'), async (req, res) => {
    try {
        const data = await Service.login(req.body);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.status).send(message);
    }
})

router.patch("/:id", validation(schema.update.body, 'body'), authenticate, async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate({ ...req.params, ...req.body });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.delete("/:id", authenticate, async (req, res) => {
    try {
        const data = await Service.delete(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error);
    }
})

export default router;
