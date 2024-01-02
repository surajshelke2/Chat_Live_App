
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const { ErrorHandler } = require("../middleware/error");
const sendCookie = require("../utils/features");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, pic } = req.body;

    const user = await User.findOne({ email });

    if (user !== null)
      return res.status(400).json({
        success: false,
        message: "User Already Exists!!",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      pic,
    });

    sendCookie(newUser, res, "Registration Successfully!!", 201);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password"); // Fix here

    if (!user)
      return res.json({
        success: false, // Fix here
        message: "User Not Exists !!",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }
    sendCookie(user, res, `Login Successfully with ${user.name}!!`, 201); // Fix here
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, login };
