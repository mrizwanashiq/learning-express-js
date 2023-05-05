import BookService from "../services/book.js";

const BookController = {
	get: async (req, res) => {
		try {
			const books = await BookService.get(req.query);
			res.json(books);
		} catch ({ error }) {
			res.json({ message: err.message });
		}
	},

	getById: async (req, res) => {
		try {
			const book = await BookService.getById(req.params.id);
			res.json(book);
		} catch (err) {
			res.json({ message: err.message });
		}
	},

	create: async (req, res) => {
		try {
			const result = await BookService.create(req.body);
			res.status(200).json(result);
		} catch (err) {
			res.json({ message: err.message });
		}
	},

	update: async (req, res) => {
		try {
			const result = await BookService.update(req.params.id, req.body);
			res.status(200).json(result);
		} catch (err) {
			res.json({ message: err.message });
		}
	},

	delete: async (req, res) => {
		try {
			const result = await BookService.delete(req.params.id);
			res.status(200).json(result);
		} catch (err) {
			res.json({ message: err.message });
		}
	},
};

export default BookController;
