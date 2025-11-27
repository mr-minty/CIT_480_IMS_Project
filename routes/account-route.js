const express = require('express');
const path = require("path");

const accountController = require("../controllers/account-controller.js");

const router = express.Router();

router.get("/", accountController);

module.exports = router;