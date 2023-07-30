const jwt = require("jsonwebtoken");
const UsersDB = require("../models/userModel");

const handleRefresh = async (req, res) => {
  try {
    const token = req.cookies.rft;
    if (!token) return res.status(400).json({ message: "Please login" });

    const foundUser = await UsersDB.findOne({ refreshToken: token });

    if (!foundUser) return res.status(404).json({ message: "User not found" });

    const userInfo = {
      username: foundUser.username,
      phone_No: foundUser.phone_No,
    };
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "300s",
    });

    res
      .status(200)
      .cookie("act", accessToken)

      .json({ url: "welcome to Users page" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleRefresh;
