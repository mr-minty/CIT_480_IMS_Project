const express = require('express');
const ordersController = require("../controllers/orders-controller");

const router = express.Router();

// Assign an order
router.post("/:order_id/assign", ordersController.assignOrder);

module.exports = router;