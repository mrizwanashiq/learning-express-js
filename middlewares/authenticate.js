import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    const token = req.header("authorization");
    if (!token) return res.status(401).send("Access denied. No token provided.");

    const bearerToken = token.split(" ")[1];

    try {
        const decoded = jwt.verify(bearerToken, "my_temporary_secret");
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
}

export default authenticate;
