const pool = require("../db/db");

async function addUser(newUser) {
//Destructure newUser back into its individual fields
    const { username, email, password, role, name="name", dob, org_id=1 } = newUser;
    let userId;
    console.log(newUser);
    try {
//INSERT statement for user authentication info
  //reeeemove
        const [userIdResult] = await pool.query(
            `INSERT INTO users(username, email, role, password, org_id)
             VALUES(?, ?, ?, ?, ?)`,
            [username, email, role, password, org_id]
        );
        userId = userIdResult.insertId; 
//INSERT statement for non-sensitive user info    
        await pool.query(
            "INSERT INTO user_info(name, dob, user_id) VALUES(?, ?, ?)",
            [name, dob,  userId]
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
            FROM users u 
            INNER JOIN user_info i ON u.user_id = i.user_id
            WHERE u.user_id=?`,
            [userId]
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