const express = require('express');
const aiController = require("../controllers/ai-controller");

const router = express.Router();

//Parse new Inventory Item VALUES
router.post("/", aiController.getNewItemValues);

module.exports = router;
