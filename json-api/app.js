const express = require("express");
const logger = require("morgan");
require("dotenv").config();

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const contactRouter = require("./routes/contact");

const env = process.env.NODE_ENV || "dev"; // 'dev' or 'production'
const config = require("./config")[env];

if (env !== "production") {
  console.log(config);
}

console.log(`Current environment is ${env}`);

const app = express();

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.app.port);
app.set("port", port);

if (env === "production") {
  app.use(logger("combined"));
} else {
  app.use(logger("dev"));
}

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/contacts", contactRouter);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const portNum = parseInt(val, 10);

  if (isNaN(portNum)) {
    // named pipe
    return val;
  }

  if (portNum >= 0) {
    // port number
    return portNum;
  }

  return false;
}

module.exports = app;
