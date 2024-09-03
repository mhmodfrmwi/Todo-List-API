const jwt = require("jsonwebtoken");
const auth = (authHeader) => {
  if (!authHeader) {
    throw new Error("Authorization header is missing");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Authorization token is missing");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }

  return decoded.id;
};

module.exports = auth;
