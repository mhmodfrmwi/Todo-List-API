# Todo and User Management API

This project is a simple API built using Node.js, Express, and MongoDB. It allows users to register, login, and manage their todos (create, read, update, delete) with authentication.

## Features

- User registration and login (using JWT).
- Manage todos (create, read, update, delete).
- Pagination support for fetching todos.
- Basic error handling.

## Installation

1. Clone the repository and navigate into the project directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your environment variables:

   ```bash
   MONGODB_URL=<Your MongoDB URL>
   JWT_SECRET_KEY=<Your JWT Secret Key>
   PORT=<Your Port>
   ```

4. Start the server:

   ```bash
   npm start
   ```

## Usage

You can interact with the API using tools like Postman or curl.

### API Endpoints

#### User Routes

- **GET /users/**: Get all users.
- **POST /users/register**: Register a new user.
- **POST /users/login**: Login an existing user.

#### Todo Routes

- **POST /todos/**: Create a new todo.
- **GET /todos/**: Get all todos for the authenticated user.
- **GET /todos/:todoId**: Get a specific todo by ID.
- **PUT /todos/:todoId**: Update a todo by ID.
- **DELETE /todos/:todoId**: Delete a todo by ID.

## Project Source

**https://roadmap.sh/projects/todo-list-api**
