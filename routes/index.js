import express from "express";
import courseRoutes from "./course.js";
import studentRoutes from "./student.js";
import teacherRoutes from "./teacher.js";

const router = express.Router();

router.use("/courses", courseRoutes);
router.use("/students", studentRoutes);
router.use("/teachers", teacherRoutes);

export default router;
