const UsersDB = require("../models/userModel");

const handleDisplayTweet = async (req, res) => {
  try {
    const token = req.cookies.rft;

    const foundUser = await UsersDB.findOne({ refreshToken: token });

    if (!foundUser) return res.status(400).json({ message: "Invalid user" });

    const tweets = foundUser.tweet;
    const display = tweets
      .map(
        (tweet) => `
      <div class="tweet">
        <div class="author">${foundUser.username}</div>
        <div class="timestamp">${tweet.time}</div>
        <div class="content">
          ${tweet.tweetText}
        </div>
      </div>
    `
      )
      .join("");

    res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tweets Display</title>
      <style>
        /* CSS styles for the tweet container */
        body {
          font-family: Arial, sans-serif;
        }

        h1 {
          text-align: center;
          margin-top: 20px;
        }

        .tweet-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }

        /* CSS styles for each individual tweet */
        .tweet {
          margin-bottom: 20px;
          border: 1px solid #ccc;
          padding: 10px;
          background-color: #f9f9f9;
          border-radius: 5px;
        }

        .tweet .author {
          font-weight: bold;
        }

        .tweet .timestamp {
          font-size: 12px;
          color: #888;
        }

        .tweet .content {
          margin-top: 5px;
        }
      </style>
    </head>
    <body>
      <h1>PAST TWEETS</h1>
      <div class="tweet-container">
        <!-- Sample tweets -->
        ${display}
      </div>
    </body>
    </html>
  `);
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleDisplayTweet;
