const express = require('express');
const itemsController = require("../controllers/items-controller");

const router = express.Router();

router.post("/", itemsController);

module.exports = router;