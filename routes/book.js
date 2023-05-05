import express from "express";
import BookController from "../controllers/book.js";

const router = express.Router();

router.get("/", BookController.get);
router.get("/:id", BookController.getById);
router.post("/", BookController.create);
router.patch("/:id", BookController.update);
router.delete("/:id", BookController.delete);

export default router;
