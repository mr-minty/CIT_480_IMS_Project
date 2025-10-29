const express = require('express');
const path = require("path");
const changeRequestController = require("../controllers/change-request-controller");

const router = express.Router();

router.post("/", changeRequestController);

module.exports = router;