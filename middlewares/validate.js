const validate = (schema) => (req, res, next) => {
	const error = new schema(req.body).validateSync();
	if (error) {
		res.status(400).send(error);
	} else {
		// If there's no error, move on to the next middleware
		next();
	}
};

export default validate;
