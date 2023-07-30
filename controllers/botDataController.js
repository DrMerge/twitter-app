const UsersDB = require("../models/userModel");

const handleBotData = async (req, res) => {
  try {
    const token = req.cookies.rft;

    const { botStatus } = req.body;

    const foundUser = await UsersDB.findOne({ refreshToken: token });

    if (!foundUser) return res.status(404).json({ message: "User not found" });

    foundUser.botOn = botStatus;

    const result = await foundUser.save();

    res.status(204).json({ message: `BOT STATUS: ${foundUser.botOn}` });
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleBotData;
