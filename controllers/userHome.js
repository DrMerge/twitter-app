const UsersDB = require("../models/userModel");
const url = require("../config/url");

const displayHome = async (req, res) => {
  try {
    const token = req.cookies.rft;
    if (!token) return res.status(400).json({ message: "Please login" });

    const foundUser = await UsersDB.findOne({ refreshToken: token });

    if (!foundUser) return res.status(404).json({ message: "User not found" });

    const cp = foundUser.total_CP;
    const botStatus = foundUser.botOn;
    const botToggle = botStatus ? "BOT IS RUNNING " : "BOT IS AWAY";

    const tweets = foundUser.tweet;

    res.status(200).send(
      `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Bot Company</title>
    <!-- Add Google Fonts link for attractive typography -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Montserrat', Arial, sans-serif;
        text-align: center;
        padding: 40px;
        line-height: 1.6;
      }

      h1 {
        font-size: 36px;
        font-weight: 600;
        margin-bottom: 20px;
      }

      p {
        font-size: 18px;
        margin-bottom: 20px;
      }

      .bot-button {
        display: inline-block;
        background-color: #2196f3;
        color: white;
        font-size: 24px;
        padding: 15px 30px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
      }

      .bot-button:hover {
        background-color: #0b7dda;
      }

      .bot-links {
        margin-top: 30px;
      }

      .bot-links a {
        display: block;
        margin: 10px;
        text-decoration: none;
        color: #2196f3;
        font-size: 20px;
      }

      .bot-links a:hover {
        text-decoration: underline;
      }

      /* Media query for iPhones */
      @media screen and (max-width: 768px) {
        body {
          padding: 20px;
        }

        h1 {
          font-size: 30px;
        }

        .bot-button {
          font-size: 20px;
          padding: 10px 20px;
        }
      }
    </style>
  </head>
  <body>
    <h1>Welcome to TwibO, ${foundUser.username}: Your trusted Social Media Partner</h1>
    <p>Twibo is a Twitter bot that helps you make a max total of 50 tweets per day. It makes use of the GPT 3 AI model to generate these tweets. Navigate to the setup page, generate your API keys, and start using Twib today to grow your account.</p>

    <h1>CP: ${cp}</h1>
    <button class="bot-button" id="botToggle">${botToggle}</button>

    <div class="bot-links">
      <a href="http://${url}:4000/setup">Setup Bot</a>
      <a href="http://${url}:4000/prompt">Tailor Prompt</a>
      <a href="http://${url}:4000/interval">Set Tweets Interval</a>
      <a href="http://${url}:4000/display-tweets">See Previous Tweets</a>

      <a href="#">Buy CP</a>
      <a href="http://${url}:4000/logout">Logout</a>
    </div>

    <script src="/jscript/subdir/user-home.js"></script>
  </body>
</html>

    
    
    
  
    
    `
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = displayHome;
