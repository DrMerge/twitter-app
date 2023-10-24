require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const connectDB = require("./config/dbConnect");
const PORT = process.env.PORT || 4000;
const verifyJWT = require("./middleware/verifyJWT");

connectDB();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.use("/botData", require("./routes/botData"));
app.use("/register", require("./routes/register"));
app.use("/otp", require("./routes/otp"));
app.use("/retry", require("./routes/retry"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use(verifyJWT);
app.use("/", require("./routes/user_routes/home"));
app.use("/setup", require("./routes/user_routes/botSetup"));
app.use("/prompt", require("./routes/user_routes/prompt"));
app.use("/display-tweets", require("./routes/user_routes/displayTweets"));
app.use("/interval", require("./routes/user_routes/setInterval"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
