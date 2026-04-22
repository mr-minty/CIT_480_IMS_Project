const orderService = require("../services/order-service.js");

//Initial Order page render
async function renderOrders (req, res) {
    const orgId = req.session.orgId;
    try {
        const orders = await orderService.getOrders(orgId);
        if(!orders) return res.status(401).json({ error: "No orders found" });
        //Items found, render the items page
        return res.render("orders", { orders, title:"orders" });
    } catch (err) {
        console.log(err);
        throw(err);
    }
}


module.exports = { renderOrders };