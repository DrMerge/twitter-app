const UsersDB = require("../models/userModel");
const url = require("../config/url");
let botCol;
const displayHome = async (req, res) => {
  try {
    const token = req.cookies.rft;
    if (!token) return res.status(400).json({ message: "Please login" });

    const foundUser = await UsersDB.findOne({ refreshToken: token });

    if (!foundUser) return res.status(404).json({ message: "User not found" });

    const cp = foundUser.total_CP;
    const botStatus = foundUser.botOn;
    const botToggle = botStatus ? "BOT IS RUNNING " : "BOT IS AWAY";

    if (botStatus) {
      botCol = "green";
    } else {
      botCol = "red";
    }

    const tweets = foundUser.tweet;

    res.status(200).send(
      `
     <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to TwibO, ${foundUser.username}: Your trusted Social Media Partner</title>
    <!-- Add Google Fonts link for attractive typography -->
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap"
      rel="stylesheet"
    />

    <!-- ... (previous HTML code) ... -->

<style>
  body {
    background-color: black;
    color: white;
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
    background-color: ${botCol};
    color: white;
    font-size: 24px;
    border: none;
    border-radius: 50%; /* Makes it a circle */
    width: 200px; /* Adjust the width to make it bigger and circular */
    height: 200px; /* Adjust the height to make it bigger and circular */
    margin: 0 auto; /* Center horizontally */
    display: flex;
    align-items: center;
    justify-content: center; /* Center vertically */
    cursor: pointer;
  }

  
  .bot-running-button {
    background-color: #2196f3;
    color: white;
    font-size: 24px;
    border: none;
    border-radius: 50%; /* Makes it a circle */
    width: 200px; /* Adjust the width to make it bigger and circular */
    height: 200px; /* Adjust the height to make it bigger and circular */
    margin: 0 auto; /* Center horizontally */
    display: flex;
    align-items: center;
    justify-content: center; /* Center vertically */
    cursor: pointer;
  }

  .bot-links {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    max-width: 400px;
    margin: 30px auto;
  }

  .bot-links a {
    display: block;
    background-color: #2196f3;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    font-size: 18px;
  }

  .bot-links a:hover {
    background-color: #0b7dda;
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
      width: 100px;
      height: 100px;
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
      <a href="http://localhost:4000/setup">Setup Bot</a>
      <a href="http://localhost:4000/prompt">Tailor Prompt</a>
      <a href="http://localhost:4000/interval">Set Tweets Interval</a>
      <a href="http://localhost:4000/display-tweets">See Previous Tweets</a>
      <a href="#">Buy CP</a>
      <a href="http://localhost:4000/logout">Logout</a>
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
