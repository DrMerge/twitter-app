const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const UsersDB = require("../models/userModel");

const url = require("../config/url");

const handleAuth = async (req, res) => {
  try {
    const { username_phoneNo, password } = req.body;

    const foundUser =
      (await UsersDB.findOne({ phone_No: username_phoneNo })) ||
      (await UsersDB.findOne({ username: username_phoneNo }));

    if (!foundUser) return res.status(406).json({ message: "User not found" });

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) return res.status(403).json({ message: "Password Incorrect" });

    const userInfo = {
      username: foundUser.username,
      phone_No: foundUser.phone_No,
    };

    const accessTokenExpiration = "2h"; // 2 hours
    const refreshTokenExpiration = "1d"; // 1 day

    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: accessTokenExpiration,
    });

    const refreshToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: refreshTokenExpiration,
    });

    foundUser.refreshToken = refreshToken;

    const result = await foundUser.save();

    res
      .status(200)
      .cookie("act", accessToken)
      .cookie("rft", refreshToken)

      .json({ url: `http://localhost:4000/` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = handleAuth;
