// Importing package
import express from "express";

const app = express();
const port = 2022;

// Where we will keep books
let books = [];

// Configuring middlewares
app.use(express.json());

// POST API
app.post("/book", (req, res) => {
	const book = req.body;

	// Here I am getting the last book's id and adding 1 to it, if there is no book then I am assigning 1 to the id
	book.id = books.length ? books[books.length - 1].id + 1 : 1;

	// Output the book to the console for debugging
	console.log(book);
	books.push(book);

	res.send("Book is added to the database");
});

// GET API
app.get("/book", (req, res) => {
	res.json(books);
});

// GET by ID API
app.get("/book/:id", (req, res) => {
	// Reading ID from the URL, + is used to convert string to number
	const id = +req.params.id;

	// Searching books for the id
	const book = books.find((book) => book.id === id);

	// Checking if book is present
	if (book) {
		// Sending the book as response with status code 200
		res.status(200).json(book);
	} else {
		// Sending error message with status code 404
		res.status(404).send("Book not found");
	}
});

// PUT API
app.put("/book/:id", (req, res) => {
	// Reading id from the URL
	const id = parseInt(req.params.id);
	const book = req.body;
	book.id = id;

	// Remove item from the books array
	for (let i = 0; i < books.length; i++) {
		if (books[i].id === id) {
			books[i] = book;
		}
	}

	res.send("Book is replace");
});

// PATCH API
app.patch("/book/:id", (req, res) => {
	// Reading id from the URL
	const id = +req.params.id;
	const book = req.body;
	book.id = id;

	// Search books for the id and update it with properties in the request
	for (let i = 0; i < books.length; i++) {
		if (book[i].id === id) {
			// Here I am using the spread operator (`...`) to take all the properties
			// from previous book and add the new properties to it
			books[i] = { ...book[i], ...book };
		}
	}

	res.send("Book is update");
});

// DELETE API
app.delete("/book/:id", (req, res) => {
	// Reading id from the URL
	const id = +req.params.id;

	// array.filter() method returns a new array with all the elements that pass the test implemented by the provided function
	books = books.filter((i) => i.id !== id);

	res.send("Book is deleted");
});

app.listen(port, () =>
	console.log(`Hello world app listening on port ${port}!`)
);
