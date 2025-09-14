const express = require("express");
const app = express();

// middleware
app.use(express.urlencoded({ extended: true })); // parses form submissions
app.use(express.json()); // parses JSON payloads


// test route
app.get("/", (req, res) => {
  res.send("IMS Project is running 🚀");
});

module.exports = app;
