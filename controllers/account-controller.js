const userService = require("../services/user-service");

async function renderAccounts(req, res) {
    const userId = req.session.userId;

    try {
        const userAccount = await userService.getUserAccount(userId);
        const userCreds = await userService.getUserCreds(userId);

        if(!userAccount || !userCreds) return res.status(500).json({ error: "User not found" });


        //check for null name
        if(!userAccount.name) userAccount.name = "Value not set";

        //check for null birthday
        if(!userAccount.dob) userAccount.dob = "Value not set";
        else {
            //Format created_at date
            userAccount.dob = new Date(userAccount.dob).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
            });
        }   
        //Format created_at date
        userAccount.created_at = new Date(userAccount.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });

        const userInfo = { ...userAccount, ...userCreds };
        return res.render("account", { 
            title: "account",
            user: userInfo
         });
    } catch (err) {
        console.log(err);
        return res.redirect("/dashboard");
    }
}

module.exports = renderAccounts;