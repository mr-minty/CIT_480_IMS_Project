const express = require('express');
const ordersController = require("../controllers/orders-controller");

const router = express.Router();

//Render Items Page
router.get("/", ordersController.renderOrders);

module.exports = router;