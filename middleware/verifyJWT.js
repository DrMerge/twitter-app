const jwt = require("jsonwebtoken");
const path = require("path");
const verifyJWT = (req, res, next) => {
  const token = req.cookies.act;
  if (!token)
    return res
      .status(403)
      .sendFile(path.join(__dirname, "..", "views", "auth.html"));
  // .json({ url: "http://localhost:4000/auth", message: "Please log in " });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .sendFile(path.join(__dirname, "..", "views", "auth.html"));

    // console.log(`decoded:`, decoded);

    next();
  });
};
module.exports = verifyJWT;
