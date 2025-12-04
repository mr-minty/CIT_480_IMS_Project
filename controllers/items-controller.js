const inventoryService = require("../services/inventory-service.js");

async function renderItems (req, res) {
    
    const items = await inventoryService.getInventory(req.session.orgId);
    res.render("items", { items, title:"items" });
}

module.exports = renderItems;