import express from "express";
const router = express.Router();
import bookModel from "../models/book.js";

router.get("/", async (req, res) => {
	try {
		// http://localhost:3000/book?author=J.K.Rowling&price[gt]=1000&stock[lt]=10&search=Harry
		const filter = {};
		if (req.query.author) {
			filter.author = req.query.author;
		}
		if (req.query.price) {
			// if we send price[gt]=1000&price[lt]=2000, then req.query.price will be an object
			if (typeof req.query.price === "object") {
				// if we send price[gt]=1000, then req.query.price.$gt will be 1000
				if (req.query.price.gt) {
					filter.price = { ...filter.price, $gt: req.query.price.gt };
				}
				// if we send price[lt]=2000, then req.query.price.$lt will be 2000
				if (req.query.price.lt) {
					filter.price = { ...filter.price, $lt: req.query.price.lt };
				}
			}
			// if we send price=1000, then req.query.price will be 1000
			else {
				filter.price = req.query.price;
			}
		}

		if (req.query.stock) {
			// Like price, if we send stock[gt]=1000&stock[lt]=2000, then req.query.stock will be an object
			if (typeof req.query.stock === "object") {
				if (req.query.stock.gt) {
					filter.stock = { ...filter.stock, $gt: req.query.stock.gt };
				}
				if (req.query.stock.lt) {
					filter.stock = { ...filter.stock, $lt: req.query.stock.lt };
				}
			} else {
				filter.stock = req.query.stock;
			}
		}

		// If we send search=Harry, then we will get all the books whose name contains Harry
		if (req.query.search) {
			filter.$or = [
				{ name: { $regex: req.query.search, $options: "i" } },
				{ author: { $regex: req.query.search, $options: "i" } },
			];
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
		const books = await bookModel.find(filter).sort(sort);

		res.json(books);
	} catch ({ message }) {
		res.json({ message });
	}
});

router.get("/", async (req, res) => {
	try {
		const pipeline = [];

		// Check for name parameter and add to pipeline
		if (req.query.name) {
			pipeline.push({
				$match: {
					name: req.query.name,
				},
			});
		}

		// Check for author parameter and add to pipeline
		if (req.query.author) {
			pipeline.push({
				$match: {
					author: req.query.author,
				},
			});
		}

		// Check for price[gt] parameter and add to pipeline
		if (req.query.price && req.query.price.gt) {
			pipeline.push({
				$match: {
					price: { $gt: req.query.price.gt },
				},
			});
		}

		// Check for price[lt] parameter and add to pipeline
		if (req.query.price && req.query.price.lt) {
			pipeline.push({
				$match: {
					price: { $lt: req.query.price.lt },
				},
			});
		}

		// Check for price parameter is not object and add to pipeline
		if (typeof req.query.price !== "object") {
			pipeline.push({
				$match: {
					price: req.query.price,
				},
			});
		}

		// Check for stock parameter is not object and add to pipeline
		if (typeof req.query.stock !== "object") {
			pipeline.push({
				$match: {
					stock: req.stock.price,
				},
			});
		}

		// Check for stock[gt] parameter and add to pipeline
		if (req.query.stock && req.query.stock.gt) {
			pipeline.push({
				$match: {
					stock: { $gt: req.query.stock.gt },
				},
			});
		}

		// Check for stock[lt] parameter and add to pipeline
		if (req.query.stock && req.query.stock.lt) {
			pipeline.push({
				$match: {
					stock: { $lt: req.query.stock.lt },
				},
			});
		}

		// Check for search parameter and add to pipeline
		if (req.query.search) {
			pipeline.push({
				$match: {
					title: { $regex: req.query.search, $options: "i" },
				},
			});
		}

		const books = await bookModel.aggregate(pipeline);
		res.json(books);
	} catch ({ message }) {
		res.json({ message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const book = await book.findById(req.params.id);
		res.json(book);
	} catch ({ message }) {
		res.json({ message });
	}
});

router.post("/", async (req, res) => {
	try {
		const result = await bookModel.create(req.body);
		res.status(200).json(result);
	} catch ({ message }) {
		res.json({ message });
	}
});

router.patch("/:id", async (req, res) => {
	try {
		const result = await bookModel.findByIdAndUpdate(req.params.id, req.body);
		res.status(200).json(result);
	} catch ({ message }) {
		res.json({ message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const result = await bookModel.findByIdAndDelete(req.params.id);
		res.status(200).json(result);
	} catch ({ message }) {
		res.json({ message });
	}
});

export default router;
