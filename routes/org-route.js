const express = require('express');
const path = require("path");

const orgController = require("../controllers/org-controller.js");

const router = express.Router();

router.get("/", orgController);

module.exports = router;