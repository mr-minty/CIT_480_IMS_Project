const pool = require("../db/db");

async function getInventory(orgId) {
    try{
        const [items] = await pool.query(
        `SELECT * FROM items
            WHERE org_id=?`,
            [orgId]
        );
        return items;
    } catch (err) {
        throw err;
    }
}

module.exports = { getInventory };