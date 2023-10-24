const jwt = require("jsonwebtoken");
const UsersDB = require("../models/userModel");
const url = require("../config/url");
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

const otpAUTH = async (req, res) => {
  try {
    const { otp } = req.body;
    const encrptedID = req.cookies.Verf_ID;

    jwt.verify(encrptedID, process.env.UTILITY_ENCRYPTION, async (err, ID) => {
      if (err) return res.status(401).send("Unable to validate Identity");

      await client.verify.v2
        .services(process.env.SERVICEID)
        .verificationChecks.create({ to: `+234${ID.phone_No}`, code: otp })
        .then(async (verification_check) => {
          if (verification_check.status != "approved")
            return res.status(400).json({ error: "Please Retry OTP" });

          const result = await UsersDB.create({
            username: ID.username,
            email: ID.email,
            phone_No: ID.phone_No,
            password: ID.password,
            refreshToken: "",
          });

          console.log("\n Verification status: " + verification_check.status);
          res.status(200).json({ url: `http://${url}:4000/auth` });
        });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = otpAUTH;
