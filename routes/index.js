const express = require('express');
const router = express.Router();
const path = require('path');

const registerRouter = require("../routes/register-route.js");
const loginRouter = require("../routes/login-route.js");
const dashboardRouter = require("../routes/dashboard-route.js");
const tableRouter = require("../routes/table-route.js");
const logoutRouter = require("../routes/logout-route.js");
const accountRouter = require("../routes/account-route.js");
const itemsRouter = require("../routes/items-route.js");

//External middleware
const requireLogin = require("../middleware/auth.js");
const inventoryService = require("../services/inventory-service.js");

//Routes
router.use("/api/register", registerRouter);
router.use("/api/login", loginRouter);
router.use("/dashboard", requireLogin, dashboardRouter);
router.use("/api/logout", logoutRouter);
router.use("/account", requireLogin, accountRouter)
router.use("/items", requireLogin, itemsRouter)

//Static Files
router.use(express.static(path.join(__dirname, "..", "public")));


//Pages
router.get("/", (req, res) => {
    if(req.session.userId) return res.redirect("/dashboard");
    else return res.redirect("/login");  
});

router.get("/login", (req, res) => {
  if(req.session.userId) return res.redirect("/");
  res.render('login')
});

router.get("/create-account", (req, res) => res.render('create-account'));

router.get("/orders", (req, res) => res.render('orders', { title:"orders"}));

router.get("/organization", (req, res) => res.render('organization', { title:"org"}));

//Resources
router.get("/api/maintenance-image", (req, res) => res.sendFile(path.join(__dirname, "..", "public", "img", "Maintenance-Page-Oranges.png")));

//Start Test-Branch Only Section

//Test Route Handlers
const changeRequestRouter = require("../routes/change-request-route.js");

//TEST ENDPOINT
router.get("/test", requireLogin, async (req, res) => {
  const items = await inventoryService.getInventory(req.session.orgId);
  res.render("test", { items });
});

//TEST ROUTES
router.use("/api/change-request", changeRequestRouter);

//End Test-Branch Only Section

// 404 handler, MUST BE FINAL ROUTE
router.use((req, res) => {
  res.status(404).redirect('/'); // or redirect('/')
});

module.exports = router;