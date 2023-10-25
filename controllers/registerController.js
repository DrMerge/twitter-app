const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const UsersDB = require("../models/userModel");
const url = require("../config/url");
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

const handleRegister = async (req, res) => {
  const { username, password, email, phone_No } = req.body;
  console.log("from server" + username, phone_No);
  if (!username || !email || !password || !phone_No)
    return res
      .status(409)
      .json({ message: "Please provide all required fields" });

  try {
    const duplicate =
      (await UsersDB.findOne({ username: username }).exec()) ||
      (await UsersDB.findOne({ phone_No: phone_No }).exec());

    if (duplicate)
      return res.status(409).json({ message: "User already exists" });

    const hashedPwd = await bcrypt.hash(password, 10);

    const ID = {
      username: username,
      email: email,
      phone_No: phone_No,
      password: hashedPwd,
      refreshToken: "",
    };
    // console.log(ID)
    const encryptedID = jwt.sign(ID, process.env.UTILITY_ENCRYPTION);
    // console.log(encryptedID)
    client.verify.v2
      .services(process.env.SERVICEID)
      .verifications.create({ to: `+234${phone_No}`, channel: `whatsapp` })
      .then((verification) => {
        console.log(verification.status);
      });

    res
      .status(200)
      .cookie("Verf_ID", encryptedID, {
        httpOnly: true,
        //   sameSite: "None",

        //   maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ url: `http://localhost:4000/otp` });
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleRegister;
