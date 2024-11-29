const express = require("express");
const User = require("./user_model");
const router = express.Router();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/admin", async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const admin = await User.findOne({ username });
    if (password !== admin.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1m" } 
    );

    return res.status(200).json({
      message: "Authentication successful",
      token,
      user: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
