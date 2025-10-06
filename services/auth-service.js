const pool = require("../db/db");


async function checkUserCredentials(userCredential) {
    let username = userCredential.username || userCredential.loginField;
    let email = userCredential.email || userCredential.loginField;

//Check database for exising user
    try {
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE username=? OR email=?",
            [username, email]
        );
        const authorizedUser = rows[0];
        return authorizedUser || null;
    } catch(err) {
        console.log(err);
        throw err;
    }
}


module.exports = { checkUserCredentials };