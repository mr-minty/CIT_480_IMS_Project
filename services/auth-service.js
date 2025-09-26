const pool = require("../db/db");


async function checkUserCredentials(userCredential) {
    let username = userCredential.username || userCredential.loginField;
    let email = userCredential.email || userCredential.loginField;
    let password = userCredential.password;

    const conditions = [ "username=?", "email=?" ];
    const values = [ username, email ];

    let queryString = "SELECT * FROM users WHERE (" + conditions.join(" OR ") + ")";

    if(password){
        queryString += " AND password_hash=?";
        values.push(password);
    }
//Check database for exising user
    try {
        const [rows] = await pool.query(queryString, values)
        return rows[0] || null;
    } catch(err) {
        throw err;
    }
}

module.exports = checkUserCredentials;