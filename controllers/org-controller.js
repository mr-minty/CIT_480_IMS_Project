const userService = require("../services/user-service");

async function renderOrgs(req, res) {
    const orgId = req.session.orgId;
    const userId = req.session.userId;
    
    try {
      const orgInfo = await userService.getOrgInfo(userId);
      console.log("orgInfo: ", orgInfo);
      if(!orgInfo) return res.status(500).json({ error: "Org not found." });

      const orgMembers = await userService.getOrgMembers(orgId);
      
      if(!orgMembers) return res.status(500).json({ error: "Org not found." });

      return res.render("organization", {
        title: "organization",    
        members: orgMembers,
        info: orgInfo
      });

    } catch (err) {
        console.log(err);
        res.redirect("/dashboard");
    }
}
module.exports = renderOrgs;