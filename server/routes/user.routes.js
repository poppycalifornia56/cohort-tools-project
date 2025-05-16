const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
