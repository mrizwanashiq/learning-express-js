const validation = (schema, data) => (req, res, next) => {
    const { value, error } = schema.validate(req[data])
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return res.status(401).json((errorMessage));
    }
    req[data] = value;
    return next();
}

export default validation;
