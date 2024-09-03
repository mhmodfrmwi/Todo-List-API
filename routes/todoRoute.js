const express = require("express");

const route = express.Router();
const todoController = require("../controllers/todoController");
route.use(express.json());
route.post("/", todoController.addTodo);
route.put("/:todoId", todoController.updateTodo);
route.delete("/:todoId", todoController.deleteTodo);
route.get("/:todoId", todoController.getTodo);
route.get("/", todoController.getAllTodo);
module.exports = route;
