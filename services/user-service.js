const pool = require("../db/db");

async function addUser(newUser) {
//Destructure newUser back into its individual fields
    const { username, email, password, role, name, dob, org_id=1 } = newUser;
    let userId;
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

//Get user's username, email, role 
async function getUserCreds(userId) {
    try {
        const [row] = await pool.query(
          `SELECT u.username, u.email, u.role 
           FROM users u
           WHERE u.user_id=?`,
           [userId]  
        );

        const userCreds = row;

        if(!userCreds) return null;

        return userCreds;
    } catch (err) {
        throw err;
    }
}

async function getUserAccount(userId) {
//Get user's username, role, name, and dob, and created_at
    try {
        const [rows] = await pool.query(
           `SELECT u.username, u.role, i.name, i.dob, i.created_at, o.name AS org_name
            FROM users u 
            INNER JOIN user_info i ON u.user_id = i.user_id
            INNER JOIN orgs o ON u.org_id = o.org_id
            WHERE u.user_id=?`,
            [userId]
        );

        const userAccount = rows[0];
        if(!userAccount) return null;
//Operation successful, return the user account information
        return userAccount;
    } catch (err) {
        throw err;
    }
} 

async function getOrgInfo(userId) {
    try {
        const [rows] = await pool.query(
            `SELECT o.name, owner_info.name AS owner
             FROM users u
             JOIN orgs o ON o.org_id = u.org_id
             JOIN users owner ON owner.org_id = o.org_id AND owner.role = "org_owner"
             JOIN user_info owner_info ON owner_info.user_id = owner.user_id
             WHERE u.user_id = ?`,
             [userId]
        );

        const orgInfo = rows[0];
        if(!orgInfo) return null;
        return orgInfo;
    } catch (err) {
        throw err;
    }
}

async function getOrgMembers(orgId) {
    try {
        const [rows] = await pool.query(
            `SELECT i.name, u.role
             FROM users u
             INNER JOIN user_info i ON u.user_id = i.user_id
             WHERE u.org_id=?`,
             [orgId]
        );

        const orgMembers = rows;
        if(!orgMembers) return null;
        return orgMembers;
    } catch (err) {
        throw err;
    }
}

module.exports = { addUser, getUserCreds, getUserAccount, getOrgInfo, getOrgMembers} ;