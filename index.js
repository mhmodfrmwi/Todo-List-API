const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));
const userRoute = require("./routes/userRoute");
const todoRoute = require("./routes/todoRoute");
app.use("/users", userRoute);
app.use("/todos", todoRoute);
app.listen(process.env.PORT||8000);
