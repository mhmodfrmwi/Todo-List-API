const Todo = require("../models/todoModel");
const jwt = require("jsonwebtoken");
const auth = require("../utils/auth");
const addTodo = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const userId = auth(authHeader);

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        status: "error",
        message: "Title and description are required",
      });
    }

    const todo = new Todo({ title, description, userId });
    await todo.save();

    res.status(201).json({
      status: "success",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while adding the todo",
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const userId = auth(authHeader);
    const todoId = req.params.todoId;
    const payload = req.body;

    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res
        .status(404)
        .json({ status: "fail", message: "Todo not found" });
    }

    if (todo.userId.toString() !== userId) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to update this todo",
      });
    }

    delete payload.userId;

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, payload, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while updating the todo",
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const userId = auth(authHeader);
    const todoId = req.params.todoId;

    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({
        status: "error",
        message: "Todo not found",
      });
    }

    if (todo.userId.toString() !== userId) {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to delete this todo",
      });
    }

    await todo.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while deleting the todo",
    });
  }
};

const getTodo = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const userId = auth(authHeader);
    const todoId = req.params.todoId;

    const todo = await Todo.findById(todoId);
    console.log(todo);

    if (!todo || todo.userId.toString() !== userId) {
      return res.status(404).json({
        status: "error",
        message: "Todo not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while retriving the todo",
    });
  }
};
const getAllTodo = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const userId = auth(authHeader);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const todos = await Todo.find({ userId }).skip(skip).limit(limit);

    const totalTodos = await Todo.countDocuments({ userId });

    res.status(200).json({
      status: "success",
      results: todos.length,
      total: totalTodos,
      page,
      limit,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while retrieving the todos",
    });
  }
};

module.exports = {
  addTodo,
  updateTodo,
  deleteTodo,
  getAllTodo,
  getTodo,
};
