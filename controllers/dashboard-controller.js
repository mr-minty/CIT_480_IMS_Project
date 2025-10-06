const userService = require("../services/user-service");
const inventoryService = require("../services/inventory-service");

//Dashboard render variables NOT dependent on user
const dashboardTitle = "Dashboard";
const dashboardContent= "Dashboard-Content";

async function renderDashboard(req, res) {
    const userId = req.session.userId;
    const orgId = req.session.orgId;
//Check if user has a valid userId session cookie
    if (!userId) {
    return res.redirect("/login"); // or return 401
    }

//Get user info for dashboard rendering
    try {
        const userInfo = await userService.getUserInfo(userId);
        const userInventory = await inventoryService.getInventory(orgId);
        console.log(userInventory);
        if(!userInfo) return res.redirect("/login");
        return res.render("dashboard", { 
            user: userInfo,
            title: dashboardTitle,
            content: dashboardContent,
            items: userInventory
        });
    } catch(err) {
        return res.status(500).json({ error: "User not found" });
    }
}

module.exports = renderDashboard;