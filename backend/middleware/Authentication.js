const { jwt } = require("jsonwebtoken");
const User = require("../model/userModel");
const { message } = require("statuses");

const isAthenticated = async (req, res, next) => {
  try {
    const token = req.body.token;

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "User Not found ",
      });
    }

    const decode = jwt.verify(token, process.env.JWTToken);

    const user = await User.findone(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ErrorHandler("Invalid Token", 404));
  }
};

module.exports = isAthenticated;
