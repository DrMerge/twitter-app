const UsersDB = require("../models/userModel");

const handleSendPage = async (req, res) => {
  try {
    const token = req.cookies.rft;

    const foundUser = await UsersDB.findOne({ refreshToken: token });

    if (!foundUser) return res.status(400).json({ message: "fuck you" });

    res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Twitter API Credentials</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 40px;
    }

    h1 {
      font-size: 32px;
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

    input {
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
  <h1>Twitter API Credentials</h1>
  <h2>${foundUser.username} please enter Your Twitter credentials</h2>

  <form>
    <label for="apiKey">API Key:</label>
    <input type="text" id="apiKey" required>

    <label for="apiSecret">API Secret:</label>
    <input type="text" id="apiSecret" required>

    <label for="accessToken">Access Token:</label>
    <input type="text" id="accessToken" required>

    <label for="accessTokenSecret">Access Token Secret:</label>
    <input type="text" id="accessTokenSecret" required>

    <button id="submitBtn">Submit</button>
  </form>
  <script src="/jscript/subdir/user-setup.js"></script>
</body>
</html>
`);
  } catch (err) {
    console.log(err);
  }
};

const handleSetup = async (req, res) => {
  try {
    const token = req.cookies.rft;

    const { APIKEY, APISECRET, ACCESSTOKEN, ACCESSSECRET } = req.body;

    if (!APIKEY || !APISECRET || !ACCESSTOKEN || ACCESSSECRET)
      return res.status(403).send("Please enter all fields");

    const foundUser = await UsersDB.findOne({ refreshToken: token });

    if (!foundUser) return res.status(400).json({ message: "fuck you" });

    foundUser.APIKEY = APIKEY;
    foundUser.APISECRET = APISECRET;
    foundUser.ACCESSTOKEN = ACCESSTOKEN;
    foundUser.ACCESSSECRET = ACCESSSECRET;

    const result = await foundUser.save();

    res
      .status(200)
      .json({ message: "Setup complete", url: "http://localhost:4000/home" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { handleSetup, handleSendPage };
