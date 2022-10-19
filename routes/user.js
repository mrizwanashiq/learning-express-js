import express from "express";
const router = express.Router();
import Service from "../services/user.js"
import upload from '../middlewares/upload.js'

router.get("/", async (req, res) => {
    try {
        const data = await Service.getAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post("/", upload.array('image'), async (req, res) => {
    try {
        if (req.files)
            req.body.image = `${req.protocol}://${req.get("host")}/${req.files[0].path}`;
        const data = await Service.add(req.body);
        res.status(200).json(data);
    } catch (error) {
        res.send(error);
    }
})

router.patch("/:id", async (req, res) => {
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
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error);
    }
})

export default router;
