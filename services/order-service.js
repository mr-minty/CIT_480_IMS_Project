const pool = require("../db/db");

async function getOrders(orgId) {
    const [rows] = await pool.query(
        `SELECT o.order_id, o.org_id, o.user_id, o.status, i.name, r.quantity, o.created_at
        FROM order_items r
        INNER JOIN orders o ON o.order_id = r.order_id
        INNER JOIN items i ON i.item_id = r.item_id
        WHERE i.org_id = ?`,
        [orgId]  
    );

    const groupedOrders = {};

    for (const row of rows) {
    if (!groupedOrders[row.order_id]) {
        groupedOrders[row.order_id] = {
        order_id: row.order_id,
        org_id: row.org_id,
        user_id: row.user_id,
        status: row.status,
        created_at: row.created_at,
        items: []
        };
    }

    groupedOrders[row.order_id].items.push({
        name: row.name,
        quantity: row.quantity
    });
    }

    const orders = Object.values(groupedOrders);
    return orders;
}

module.exports = { getOrders };