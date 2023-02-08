import express from "express";
import bookModel from "../models/book.js";
const router = express.Router();

router.get("/", async (req, res) => {
	const data = await bookModel.find();
	res.render("book/simple-table", { data });
});

router.get("/table", async (req, res) => {
	const data = await bookModel.find();
	res.render("book/table", { data });
});

router.post("/table", async (req, res) => {
	await bookModel.create(req.body);
	const data = await bookModel.find();
	res.render("book/table", { data });
});

router.post("/", async (req, res) => {
	await bookModel.create(req.body);
	const data = await bookModel.find();
	res.render("book/simple-table", { data });
});

router.post("/update", async (req, res) => {
	await bookModel.findByIdAndUpdate(req.body.id, req.body);
	res.redirect("/book");
});

router.get("/delete/:id?", async (req, res) => {
	await bookModel.findByIdAndDelete(req.params.id);
	res.redirect("/book");
});

router.post("/serverside", async (req, res) => {
	const { body } = req;
	const reg = new RegExp(body["search[value]"], "g");
	const columnNumber = body["order[0][column]"];
	const columnName = body["columns[" + columnNumber + "][data]"];
	const sortCol = body["order[0][dir]"] === "asc" ? 1 : -1;
	const sortObj = { [columnName]: sortCol };

	const books = await bookModel.aggregate([
		{ $match: { name: reg } },
		{ $sort: sortObj },
		{ $skip: +body.start },
		{ $limit: +body.length },
	]);
	const count = await bookModel.count();

	res.status(200).json({
		draw: req.body.draw,
		recordsTotal: count,
		recordsFiltered: +body.length,
		data: books,
	});
});

export default router;
