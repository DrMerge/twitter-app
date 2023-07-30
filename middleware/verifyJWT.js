const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.cookies.act;
  if (!token) return res.status(403).send("Bad request");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).send("UNAUTHENTICATED");

    // console.log(`decoded:`, decoded);

    next();
  });
};
module.exports = verifyJWT;
