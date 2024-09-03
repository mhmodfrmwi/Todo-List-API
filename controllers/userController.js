const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = (req, res) => {
  const users = User.find({}, { __v: false, password: false });
  res.status(200).json({ status: "success", data: users });
};
const register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });
  newUser.save();
  res.status(201).json({
    status: "success",
    data: newUser,
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "user email not found",
    });
  }
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    return res.status(404).json({
      status: "fail",
      message: "password is not correct",
    });
  }
  const userToken = jwt.sign(
    { email: user.email, id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "10m" }
  );
  user.token = userToken;
  res.status(200).json({
    status: "success",
    message: "logged in successfully",
    data: user,
  });
};
module.exports = {
  getAllUsers,
  register,
  login,
};
