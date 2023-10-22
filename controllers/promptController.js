const UsersDB = require("../models/userModel");
const url = require("../config/url");

const receivePrompt = async (req, res) => {
  try {
    const token = req.cookies.rft;

    const { prompt } = req.body;

    const foundUser = await UsersDB.findOne({ refreshToken: token });

    if (!foundUser) return res.status(404).json({ message: "User not found" });

    res.status(200).send(
      `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ENTER PROMPT Credentials</title>
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

    textarea {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-top: 5px;
      resize: vertical; /* Allows vertical resizing of the textarea */
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
  <h1>Current Prompt</h1>
  <h2>&#128394; ${foundUser.prompt}</h2>

  <form>
    <label for="prompt">Enter New Prompt:</label>
    <textarea id="prompt" rows="8"></textarea> <!-- Adjust the number of rows as per your requirement -->

    <input type="submit" value="Submit" id="submitBtn">
  </form>
  <script src="/jscript/subdir/user-prompt.js"></script>
</body>
</html>

`
    );
  } catch (err) {
    console.log(err);
  }
};

const handlePrompt = async (req, res) => {
  try {
    const token = req.cookies.rft;

    const { prompt } = req.body;

    if (!prompt) return res.status(403).send("Please enter a valid prompt");

    const foundUser = await UsersDB.findOne({ refreshToken: token });

    if (!foundUser) return res.status(404).json({ message: "User not found" });

    foundUser.prompt = prompt;

    const result = await foundUser.save();

    res.status(204).json({ message: `Prompt added successfully` });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { receivePrompt, handlePrompt };
