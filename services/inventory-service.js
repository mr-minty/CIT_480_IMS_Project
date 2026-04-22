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

    //Get category and supplier foreign key integer ID
    const category_id = await checkCategory(category);
    const supplier_id = await checkSupplier(supplier);

    try {
        //Insert new item row
        await pool.query(
            `INSERT INTO items 
            (name, sku, org_id, category_id, supplier_id, quantity, price, unit) VALUES
            (?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, nextSku, orgId, category_id, supplier_id, quantity, price, unit] 
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



// HELPER FUNCTIONS
async function checkCategory(category) {
    try {
        const [rows] = await pool.query(
            `SELECT c.category_id
             FROM categories c
             WHERE c.name = ?`,
            [category]
        );

        // Category already exists
        if (rows.length > 0) {
            return rows[0].category_id;
        }

        // Category not found, create it
        const [result] = await pool.query(
            `INSERT INTO categories
             (name, description)
             VALUES (?, ?)`,
            [category, ""]
        );

        return result.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function checkSupplier(supplier) {
    try {
        const [rows] = await pool.query(
            `SELECT s.supplier_id
             FROM suppliers s
             WHERE s.name = ?`,
            [supplier]
        );

        // supplier already exists
        if (rows.length > 0) {
            return rows[0].supplier_id;
        }

        // supplier not found, create it
        const [result] = await pool.query(
            `INSERT INTO suppliers
             (name)
             VALUES (?)`,
            [supplier]
        );

        return result.insertId;
    } catch (err) {
        console.log(err);
        throw err;
    }
}