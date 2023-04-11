import express from "express";
const router = express.Router();
import bookModel from "../models/book.js";

router.get("/", async (req, res) => {
	try {
		// http://localhost:3000/book?author=J.K.Rowling&price[gt]=1000&stock[lt]=10
		const query = {};
		if (req.query.author) {
			query.author = req.query.author;
		}
		if (req.query.price) {
			// if we send price[gt]=1000&price[lt]=2000, then req.query.price will be an object
			if (typeof req.query.price === "object") {
				// if we send price[gt]=1000, then req.query.price.$gt will be 1000
				if (req.query.price.gt) {
					query.price = { ...query.price, $gt: req.query.price.gt };
				}
				// if we send price[lt]=2000, then req.query.price.$lt will be 2000
				if (req.query.price.lt) {
					query.price = { ...query.price, $lt: req.query.price.lt };
				}
			}
			// if we send price=1000, then req.query.price will be 1000
			else {
				query.price = req.query.price;
			}
		}

		if (req.query.stock) {
			// Like price, if we send stock[gt]=1000&stock[lt]=2000, then req.query.stock will be an object
			if (typeof req.query.stock === "object") {
				if (req.query.stock.gt) {
					query.stock = { ...query.stock, $gt: req.query.stock.gt };
				}
				if (req.query.stock.lt) {
					query.stock = { ...query.stock, $lt: req.query.stock.lt };
				}
			} else {
				query.stock = req.query.stock;
			}
		}

		// Creating sort object, if we send sort=price&sort=-author, then sort will be {price: 1, author: -1}
		const sort = {};
		if (req.query.sort) {
			// if we send sort=price&sort=-author, then req.query.sort will be an array
			if (typeof req.query.sort === "object") {
				// Iterating over the array and creating sort object
				req.query.sort.forEach((element) => {
					//
					if (element.startsWith("-")) {
						sort[element.substring(1)] = -1;
					} else {
						sort[element] = 1;
					}
				});
			}
			// if we send sort=price, then req.query.sort will be a string
			else {
				if (req.query.sort.startsWith("-")) {
					sort[req.query.sort.substring(1)] = -1;
				} else {
					sort[req.query.sort] = 1;
				}
			}
		}

		// finally, we are finding the books based on the query and sorting the books based on the sort object
		const books = await bookModel.find(query).sort(sort);

		res.json(books);
	} catch ({ message }) {
		res.json({ message });
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
