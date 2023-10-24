const jwt = require("jsonwebtoken");
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

const handleRetry = async (req, res) => {
  try {
    const encryptedID = req.cookies.Verf_ID;

    jwt.verify(encryptedID, process.env.UTILITY_ENCRYPTION, async (err, ID) => {
      if (err) {
        return res.status(401).send("Unable to validate Identity");
      }

      const phoneNo = `+234${ID.phone_No}`;

      await client.verify
        .services(process.env.SERVICEID)
        .verifications.create({
          to: phoneNo,
          channel: "whatsapp",
        })
        .then((verification) => {
          console.log("Verification status:", verification.status);

          // Send a success response to the client
          res
            .status(200)
            .json({ message: "Verification code sent successfully." });
        })
        .catch((error) => {
          console.error("Twilio verification error:", error);
          res.status(500).json({ message: "Error sending verification code." });
        });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = handleRetry;
