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

async function getUserInfo(userId) {
//Get user information from user_info and users_table
    try {
        const [rows] = await pool.query(
           `SELECT u.username, u.role, i.name, i.dob  
            FROM users u" +
            INNER JOIN user_info i ON u.user_id = i.user_id`
        );

        const userInfo = rows[0];
        if(!userInfo){
            return null;
        }
//Operation successful, return the userInfo
        return userInfo;
    } catch (err) {
        throw err;
    }
} 

module.exports = { addUser, getUserInfo} ;