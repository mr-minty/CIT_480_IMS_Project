const express = require('express');
const itemsController = require("../controllers/items-controller");

const router = express.Router();

//Add new Inventory Item 
router.post("/retrieve", itemsController.retrieveItems);

//Add new Inventory Item
router.post("/add", itemsController.addNewItem);

module.exports = router;
