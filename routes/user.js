const express = require('express');
const userModel = require('../models/user');
const authenticate = require('../middlewares/authenticate');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get("/view", (req, res) => {
    try {
        // const user = await userModel.find();
        res.render("user/table");
    } catch (error) {
        res.status(500).send(error);

    }
})

router.get("/", authenticate, async (req, res) => {
    try {
        const users = await userModel.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get("/:id", authenticate, async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post("/register", async (req, res) => {
    try {
        const user = await userModel.create(req.body);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email, password: req.body.password });
        if (!user) return res.status(401).send("Invalid email or password.");
        const token = jwt.sign({ id: user._id }, "my_temporary_secret", { expiresIn: "1h" });
        res.send(token);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.patch("/:id", authenticate, async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.delete("/:id", authenticate, async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;
