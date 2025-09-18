const express = require('express');
const path = require("path");
const dashboardController = require("../controllers/dashboard-controller");

const router = express.Router();

router.get("/", dashboardController);

module.exports = router;

