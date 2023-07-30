const UsersDB = require("../models/userModel");

const generateTweet = require("../makeTweet");

const handleBot = async (req, res) => {
  const token = req.cookies.rft;

  try {
    const foundUser = await UsersDB.findOne({ refreshToken: token });

    const botOn = foundUser.botOn;

    if (botOn) {
      generateTweet();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleBot;
