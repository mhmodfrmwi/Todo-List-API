const { default: mongoose } = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
});
module.exports = mongoose.model("Todo", todoSchema);
