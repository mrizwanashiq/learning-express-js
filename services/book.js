import book from "../models/book.js";

const BookService = {
	get: async (query) => {
		return book.find(query);
	},
	getById: async (id) => {
		return book.findById(id);
	},
	create: async (data) => {
		return book.create(data);
	},
	update: async ({ id, ...rest }) => {
		return book.findByIdAndUpdate(id, rest);
	},
	delete: async (id) => {
		return book.findByIdAndDelete(id);
	},
};

export default BookService;
