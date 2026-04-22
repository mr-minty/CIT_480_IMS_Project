const inventoryService = require("../services/inventory-service.js");

//Initial items page render
async function renderItems (req, res) {
    const orgId = req.session.orgId;
    try {
        const items = await inventoryService.getInventory(orgId);
        if(!items) return res.status(401).json({ error: "No items found" });
        //Items found, render the items page
        return res.render("items", { items, title:"items" });
    } catch (err) {
        console.log(err);
        throw(err);
    }
        
}

//Re-retrieve items for different sorting parameters
async function retrieveItems(req, res) {
    const orgId = req.session.orgId;
    const { column, order } = req.body;
    const sort = column + "_" + order;
    try {
        const items = await inventoryService.getInventory(orgId, sort);
        if(!items) return res.status(401).json({ error: "No items found" });
        return res.json(items);   
    } catch (err) {
        console.log(err);
    }

}

//Called by /api/add-item, add an additional item row
async function createItems (req, res) {
     const newItem = req.body; 
     const orgId = req.session.orgId;
    try {
        const newItemRow = await inventoryService.addItem(newItem, orgId);
        return res.status(201).json(newItemRow);
    } catch (err) {
       if (err.message === "DUPLICATE_NAME") {
            return res.status(400).json({ error: "An item with that name already exists" });
       }
       return res.status(500).json({ error: "Server error" });
    }

}

module.exports = { renderItems, createItems, retrieveItems };