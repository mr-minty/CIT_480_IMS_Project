const express = require('express');
const itemsController = require("../controllers/items-controller");

const router = express.Router();

//Add new Inventory Item
router.post("/", itemsController.addNewItem);

module.exports = router;
