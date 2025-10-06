const authService = require("../services/auth-service");
const bcrypt = require("bcrypt");

async function loginUser(req, res) {
    const { loginField, password } = req.body;
    const userCredential = { loginField, password };
    let authorizedUser;
//Check database for matching username and password
    try {
        authorizedUser = await authService.checkUserCredentials(userCredential);
        if (!authorizedUser) return res.status(401).json({ error: "1Login Failed: Invalid username/email or password." });
        else {
            const match = await bcrypt.compare(password, authorizedUser.password);
            if(!match)  return res.status(401).json({ error: "2Login Failed: Invalid username/email or password." });
        }
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
//Set session cookie
    req.session.userId = authorizedUser.user_id;
    req.session.orgId = authorizedUser.org_id;
//User authentication successful
    return res.status(200).json({ status: "Login Successful", userId: authorizedUser.user_id });

}

module.exports = loginUser;