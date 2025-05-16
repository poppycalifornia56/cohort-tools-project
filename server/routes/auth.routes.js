const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const { isAuthenticated } = require("../middleware/jwt.middleware");

const TOKEN_SECRET = "secret-key";

const saltRounds = 10;

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (email === "" || password === "" || name === "") {
      return res.status(400).json({ message: "All fields are required." });
    }
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const createdUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    const { password: _, ...user } = createdUser.toObject();
    res.status(201).json({ user: user });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      return res.status(400).json({ message: "All fields are required." });
    }
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ message: "User not found." });
    }
    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
    if (!passwordCorrect) {
      return res.status(401).json({ message: "Incorrect password." });
    }
    const { password: _, ...user } = foundUser.toObject();
    const payload = { _id: user._id, email: user.email, name: user.name };
    const authToken = jwt.sign(payload, TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });
    res.status(200).json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log("req.payload", req.payload);
  res.status(200).json(req.payload);
});

module.exports = router;
