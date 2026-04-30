const pool = require("../db/db");

// -------- Services ---------

async function getOrders(orgId) {
    const [rows] = await pool.query(
        `SELECT o.order_id, o.org_id, o.user_id, o.status, i.name, r.quantity, 
        o.created_at, o.updated_at, u.name AS user_name
        FROM order_items r
        INNER JOIN orders o ON o.order_id = r.order_id
        INNER JOIN items i ON i.item_id = r.item_id
        LEFT  JOIN user_info u ON u.user_id = o.user_id
        WHERE o.org_id = ?`,
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
        updated_at: row.updated_at,
        user_name: row.user_name,
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

//Update db with assigned user and order status
async function assignOrder(orderId, orgId, userId) {
    const [assignment] = await pool.query(
        `UPDATE orders 
        SET user_id=?, status='assigned', updated_at=CURRENT_TIMESTAMP
        WHERE order_id=? AND org_id=? AND status='unassigned'`,
        [userId, orderId, orgId]
    );

    return assignment.affectedRows;
}

//Update db with completed order
async function submitOrder(orderId, orgId, userId) {
  const [orders] = await pool.query(
    `SELECT order_id, status, user_id
     FROM orders
     WHERE order_id = ? AND org_id = ?`,
    [orderId, orgId]
  );

  const order = orders[0];

  if (!order) {
    return { success: false, message: "Order not found" };
  }

  if (order.status !== "assigned") {
    return { success: false, message: "Order is not assigned" };
  }

  if (order.user_id !== userId) {
    return { success: false, message: "You are not assigned to this order" };
  }

  const itemUpdateResult = await updateItems(orderId);

  const [orderUpdateResult] = await pool.query(
    `UPDATE orders
     SET status = 'completed'
     WHERE order_id = ?`,
    [orderId]
  );

  return {
    success: true,
    message: "Order submitted"
  };
}

// -------- Helper functions ---------

async function updateItems(orderId) {
  const [result] = await pool.query(
    `UPDATE items i
     JOIN order_items oi ON oi.item_id = i.item_id
     SET i.quantity = i.quantity - oi.quantity
     WHERE oi.order_id = ?`,
    [orderId]
  );

  return result;
}

module.exports = { getOrders, assignOrder, submitOrder };