const express = require('express');
const path = require('path');
const tableController = require("../controllers/table-controller");

const router = express.Router();

router.get("/", tableController);

module.exports = router;