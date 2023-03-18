import express from "express";
const router = express.Router();
import bookModel from "../models/book.js";

router.get("/", async (req, res) => {
	try {
		// http://localhost:3000/book?author=J.K.Rowling&price[gt]=1000&stock[lt]=10&name=Harry Potter&id=5f9f1c1b0b1b8c1e1c8c1c1c&sort=price&sort=-name
		const query = {};
		if (req.query._id) {
			query._id = req.query._id;
		}
		if (req.query.name) {
			query.name = req.query.name;
		}
		if (req.query.author) {
			query.author = req.query.author;
		}
		if (req.query.price) {
			if(typeof req.query.price === 'object'){
				if (req.query.price.gt) {
					query.price = { $gt: req.query.price.gt };
				}
				if (req.query.price.lt) {
					query.price = { $lt: req.query.price.lt };
				}
			}else{
				query.price = req.query.price;
			}
		}

		if (req.query.stock) {
			if(typeof req.query.stock === 'object'){
				if (req.query.stock.gt) {
					query.stock = { $gt: req.query.stock.gt };
				}
				if (req.query.stock.lt) {
					query.stock = { $lt: req.query.stock.lt };
				}

			}else{
				query.stock = req.query.stock;
			}
		}

		const sort = {};
		if(req.query.sort){
			if(typeof req.query.sort === 'object'){
				req.query.sort.forEach(element => {
					if(element.startsWith('-')){
						sort[element.substring(1)] = -1;
					}else{
						sort[element] = 1;
					}
				});
				console.log(sort);
			}else{
				if(req.query.sort.startsWith('-')){
					sort[req.query.sort.substring(1)] = -1;
				}else{
					sort[req.query.sort] = 1;
				}
				console.log(sort);
			}
		}

		const books = await bookModel.find(query).sort(sort);

		res.json(books);
	} catch (err) {
		res.json({ message: err });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const book = await book.findById(req.params.id);
		res.json(book);
	} catch (err) {
		res.json({ message: err });
	}
});

router.post("/", async (req, res) => {
	try {
		const result = await bookModel.create(req.body);
		res.status(200).json(result);
	} catch (err) {
		res.json({ message: err });
	}
});

router.patch("/:id", async (req, res) => {
	try {
		const result = await bookModel.findByIdAndUpdate(req.params.id, req.body);
		res.status(200).json(result);
	} catch (err) {
		res.json({ message: err });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const result = await bookModel.findByIdAndDelete(req.params.id);
		res.status(200).json(result);
	} catch (err) {
		res.json({ message: err });
	}
});

export default router;
