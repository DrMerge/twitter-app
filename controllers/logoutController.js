const UsersDB = require("../models/userModel");

const handleLogout = async (req, res) => {
  try {
    const token = req.cookies.rft;
    if (!token) return res.status(400).json({ url: "return to login page" });

    const foundUser = await UsersDB.findOne({ refreshToken: token });

    if (!foundUser) return res.status(404).json({ message: "Error!" });

    const accessToken = null;

    foundUser.refreshToken = null;
    const result = await foundUser.save();

    res
      .status(200)
      .cookie("act", accessToken)

      .json({ url: "return to login page" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleLogout;
