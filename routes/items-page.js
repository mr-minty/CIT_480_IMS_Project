const express = require('express');
const itemsController = require("../controllers/items-controller");

const router = express.Router();

//Render Items Page
router.get("/", itemsController.renderItems);

module.exports = router;