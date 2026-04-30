const orderService = require("../services/order-service.js");
const userService = require("../services/user-service.js");

//Initial Order page render
async function renderOrders(req, res) {
    const orgId = req.session.orgId;

    try {
        const orders = await orderService.getOrders(orgId);

        const activeOrders = orders.filter(order => order.status !== "completed");
        const completedOrders = orders.filter(order => order.status === "completed");

        return res.render("orders", {
            title: "Orders",
            orders: activeOrders,
            completedOrders,
            user: req.session.user,
            page: "/orders"
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// Get all orders from db
async function getOrders (req, res) {
    const orgId = req.session.orgId;
    try {
        const orders = await orderService.getOrders(orgId);
        if(!orders) return res.status(401).json({ error: "No orders found" });

        //Items found, return orders list
        return res.json(orders);
    } catch (err) {
        console.log(err);
        throw(err);
    }
}

async function assignOrder(req, res) {
    const { order_id } = req.params;
    const userId = req.session.userId;
    const orgId = req.session.orgId;

    try {
        const result = await orderService.assignOrder(order_id, orgId, userId);

        if (result === 0) {
            return res.status(404).json({ error: "Order not found or already assigned" });
        }

        const user = await userService.getUserAccount(userId);

        return res.json({
            success: true,
            name: user.name
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
    }
}

async function submitOrder(req, res) {
    const { order_id } = req.params;
    const userId = req.session.userId;
    const orgId = req.session.orgId;

    try {
        const result = await orderService.submitOrder(order_id, orgId, userId);

        if (!result) {
            return res.status(500).json({ success: false, error: "Order submission failed" });
        }


        return res.json(result);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: "Server error" });
    }
}

module.exports = { renderOrders, getOrders, assignOrder, submitOrder };