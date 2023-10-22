const UsersDB = require("../models/userModel");
const url = require("../config/url");

const handleSendPage = async (req, res) => {
  try {
    const token = req.cookies.rft;

    const foundUser = await UsersDB.findOne({ refreshToken: token });

    if (!foundUser) return res.status(400).json({ message: "fuck you" });

    res.status(200).send(`
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Twitter API Credentials</title>
  <style>
    body {
      background-color: black;
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 40px;
    }

    h1 {
      font-size: 32px;
    }

    h2 {
      font-size: 24px;
    }

    form {
      display: flex;
      flex-direction: column;
      max-width: 400px;
      margin: 0 auto;
    }

    label {
      font-size: 20px;
      margin-top: 20px;
    }

    input,
    select {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-top: 5px;
    }

    input[type="submit"] {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 18px;
      background-color: #2196F3;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    input[type="submit"]:hover {
      background-color: #0b7dda;
    }
  </style>
</head>
<body>
  <h1>CURRENT INTERVAL SET AS: ${foundUser.tweetInterval} milliseconds</h1>
  <h2>${foundUser.username} please enter Tweet Interval</h2>

  <form>
    <label for="interval">Tweet Interval:</label>
    <input type="number" id="interval" required>

    <label for="unit">Select Unit:</label>
    <select id="unit">
   
      <option value="minutes">Minutes</option>
      <option value="hours">Hours</option>
      <option value="days">Days</option>
    </select><br>
    <p id='error'><p>

    <input type="submit" value="Submit" id="submitBtn">
  </form>
  <script src="/jscript/subdir/tweet-interval.js"></script>
</body>
</html>

`);
  } catch (err) {
    console.log(err);
  }
};

const handleInterval = async (req, res) => {
  try {
    const token = req.cookies.rft;

    const { interval } = req.body;

    if (!interval) return res.status(403).send("Please enter all fields");

    const foundUser = await UsersDB.findOne({ refreshToken: token });

    if (!foundUser) return res.status(400).json({ message: "fuck you" });

    foundUser.tweetInterval = interval;

    const result = await foundUser.save();

    res
      .status(200)
      .json({ message: "Setup complete", url: `http://${url}:4000/` });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { handleInterval, handleSendPage };
