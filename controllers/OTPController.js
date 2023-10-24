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
    const encrptedPhone_No = req.cookies.Verf_ID;

    jwt.verify(
      encrptedPhone_No,
      process.env.UTILITY_ENCRYPTION,
      async (err, phone_No) => {
        if (err) return res.status(401).send("Unable to validate Phone Number");

        await client.verify.v2
          .services(process.env.SERVICEID)
          .verificationChecks.create({ to: `+234${phone_No}`, code: otp })
          .then(async (verification_check) => {
            if (verification_check.status != "approved")
              return res.status(400).json({ error: "Please Retry OTP" });

            const user = await UsersDB.findOne({ phone_No: phone_No });

            user.phone_NoVerfied = true;

            await user.save();
            console.log("\n Verification status: " + verification_check.status);
            res.status(200).json({ url: `http://${url}:4000/auth` });
          });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = otpAUTH;
