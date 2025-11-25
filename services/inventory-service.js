const pool = require("../db/db");

async function getInventory(orgId) {
    try{
        const [items] = await pool.query(
        `SELECT i.name, i.sku, i.quantity, i.price, i.unit, c.name AS category, s.name AS supplier
         FROM items i
         INNER JOIN categories c ON c.category_id = i.category_id
         INNER JOIN suppliers s ON s.supplier_id = i.supplier_id
         ORDER BY i.sku`,
        [orgId]
        );
        return items;
    } catch (err) {
        throw err;
    }
}

module.exports = { getInventory };