const express = require("express");

const route = express.Router();
route.use(express.json());
const userController = require("../controllers/userController");
route.get("/", userController.getAllUsers);
route.post("/register", userController.register);
route.post("/login", userController.login);
module.exports = route;
