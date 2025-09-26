const pool = require("../db/db");

async function addUser(newUser) {
//Destructure newUser back into its individual fields
    const { username, email, password, role, name, dob } = newUser;

    try {
//INSERT statement for user authentication info
        const [userIdResult] = await pool.query(
            "INSERT INTO users(username, email, role, password_hash) VALUES(?, ?, ?, ?)",
            [username, email, role, password]
        );
        const userId = userIdResult.insertId; 
//INSERT statement for non-sensitive user info    
        await pool.query(
            "INSERT INTO user_info(name, dob, user_id) VALUES(?, ?, ?)",
            [name, dob, userId]
        );
    } catch (err) {
        throw err;
    }

    return userId;
}

module.exports = addUser;