const getUserInfo = require("../services/user-service.getUserInfo");

//Dashboard render variables NOT dependent on user
const dashboardTitle = "Dashboard";
const dashboardContent= "Dashboard-Content";

async function renderDashboard(req, res) {
    const userId = req.session.userId;
//Check if user has a valid userId session cookie
    if (!userId) {
    return res.redirect("/login"); // or return 401
    }

//Get user info for dashboard rendering
    try {
        const userInfo = await getUserInfo(userId);
        if(!userInfo) return res.redirect("/login");

        return res.render("dashboard", { 
            user: userInfo,
            title: dashboardTitle,
            content: dashboardContent
        });
    } catch(err) {
        return res.status(500).json({ error: "User not found" });
    }
}