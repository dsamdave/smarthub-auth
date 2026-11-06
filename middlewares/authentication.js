const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  const authToken = req.header("Authorization");

  if (!authToken) {
    return res.status(401).json({ message: "Please login!" });
  }

  const rawToken = authToken.split(" ");

  const userToken = rawToken[1];

  const decodedToken = jwt.verify(userToken, process.env.ACCESS_TOKEN);

  if (!decodedToken) {
    return res.status(401).json({ message: "Please login!" });
  }

  const user = await User.findById(decodedToken?.id);

  if (!user) {
    return res.status(401).json({ message: "Please login!" });
  }

  req.user = user;

  console.log("Complete")
  next();
};

module.exports = auth;
