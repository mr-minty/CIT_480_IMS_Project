const pool = require("../db/db");

async function getInventory(orgId, sort = "default") {
    const sortMap = {
        default_asc: "i.item_id ASC",
        default_desc: "i.item_id DESC",
        name_asc: "i.name ASC",
        name_desc: "i.name DESC",
        sku_asc: "i.sku ASC",
        sku_desc: "i.sku DESC",
        category_asc: "c.name ASC",
        category_desc: "c.name DESC",
        price_asc: "i.price ASC",
        price_desc: "i.price DESC",
        quantity_asc: "i.quantity ASC",
        quantity_desc: "i.quantity DESC"
    };

    const orderBy = sortMap[sort] || sortMap.default_asc;
    
    const [items] = await pool.query(
        `SELECT i.name, i.sku, i.quantity, i.price, i.unit, c.name AS category, s.name AS supplier
        FROM items i
        INNER JOIN categories c ON c.category_id = i.category_id
        INNER JOIN suppliers s ON s.supplier_id = i.supplier_id
        WHERE i.org_id = ?
        ORDER BY ${orderBy}`,
        [orgId]
    );
    return items;
}

async function addItem(newItem, orgId) {
    const { name, category, supplier, price, unit, quantity } = newItem;
    
    //Get next SKU
    const [rows] = await pool.query(
        `SELECT MAX(sku) as maxsku FROM items WHERE org_id=?`,
        [orgId]
        );
    const nextSku = (rows[0].maxsku || 0) + 1;

    try {
        //Insert new item row
        await pool.query(
            `INSERT INTO items 
            (name, sku, org_id, category_id, supplier_id, quantity, price, unit) VALUES
            (?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, nextSku, orgId, category, supplier, quantity, price, unit] 
        );
    } catch (err) {
        console.log("ERROR::::", err);
        if (err.code === "ER_DUP_ENTRY") {
            throw new Error("DUPLICATE_NAME");
        }
        throw err;
    }
    //Retrieve updated row
        const [items] = await pool.query(
            `SELECT i.name, i.sku, i.quantity, i.price, i.unit,
                    c.name AS category,
                    s.name AS supplier
            FROM items i
            INNER JOIN categories c ON c.category_id = i.category_id
            INNER JOIN suppliers s ON s.supplier_id = i.supplier_id
            WHERE i.org_id = ? AND i.sku = ?`,
            [orgId, nextSku]
        );
        return items[0];
}

module.exports = { getInventory, addItem };