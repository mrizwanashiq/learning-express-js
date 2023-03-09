import express from "express";
const router = express.Router();
import upload from "../middlewares/upload.js";
import FileModel from "../models/file.js";

router.get("/", async (req, res) => {
	try {
		const data = await FileModel.find();
		res.status(200).json(data);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const data = await FileModel.findById(req.params.id);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post("/", upload.single("file"), async (req, res) => {
	try {
		if (req.file) {
			req.file.path = req.file.path.replace(`\\`, `/`);

			const file = {
				link: `${req.protocol}://${req.get("host")}/${req.file.path}`,
				name: req.file.filename,
				original_name: req.file.originalname,
				type: req.file.mimetype,
				path: req.file.path,
			};
			const data = await FileModel.create(file);
			res.status(200).json(data);
		} else {
			res.status(400).send("no file found");
		}
	} catch (error) {
		res.send(error);
	}
});

router.patch("/:id", async (req, res) => {
	try {
		if (req.file) {
			req.file.path = req.file.path.replace(`\\`, `/`);

			const file = {
				link: `${req.protocol}://${req.get("host")}/${req.file.path}`,
				name: req.file.filename,
				original_name: req.file.originalname,
				type: req.file.mimetype,
				path: req.file.path,
			};
			const data = await FileModel.findByIdAndUpdate(req.params.id, file);
			res.status(200).json(data);
		} else {
			res.status(400).send("no file found");
		}
	} catch (error) {
		res.status(500).send(error);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const data = await FileModel.findByIdAndRemove(req.params.id);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).send(error);
	}
});

export default router;
