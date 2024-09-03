const { default: mongoose } = require("mongoose");
const userRoles = require("../utils/userRoles");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [userRoles.ADMIN, userRoles.USER, userRoles.SUPER_ADMIN],
    default: userRoles.USER,
    required: true,
  },
  token: {
    type: String,
  },
});
module.exports = mongoose.model("User", userSchema);
