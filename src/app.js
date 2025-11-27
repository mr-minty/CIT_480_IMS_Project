//Dotenv
require("dotenv").config();

//Node modules
const express = require("express")
const session = require("express-session");
const path = require("path")

//Route handlers
const registerRouter = require("../routes/register-route.js");
const loginRouter = require("../routes/login-route.js");
const dashboardRouter = require("../routes/dashboard-route.js");
const tableRouter = require("../routes/table-route.js");
const logoutRouter = require("../routes/logout-route.js");
const accountRouter = require("../routes/account-route.js");

//Test Route Handlers
const changeRequestRouter = require("../routes/change-request-route.js")

//External middleware
const requireLogin = require("../middleware/auth.js");
const inventoryService = require("../services/inventory-service.js");

const app = express()

//Set EJS as templating engine
app.set('view engine', 'ejs');

//Middleware
app.use(express.urlencoded({ extended: true })); // parses form submissions
app.use(express.json()); // parses JSON payloads

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true }
}));

//Static Files
app.use(express.static(path.join(__dirname, "..", "public")));

//Routes
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/dashboard", requireLogin, dashboardRouter);
app.use("/api/logout", logoutRouter);
app.use("/account", requireLogin, accountRouter)

//Pages
app.get("/", (req, res) => {
    if(req.session.userId) return res.redirect("/dashboard");
    else return res.redirect("/login");
    
});
app.get("/login", (req, res) => {
  if(req.session.userId) return res.redirect("/");
  res.render('login')
});

app.get("/create-account", (req, res) => res.render('create-account'));

app.get("/orders", (req, res) => res.render('orders', { title:"orders"}));

app.get("/organization", (req, res) => res.render('organization', { title:"org"}));

app.get("/items", (req, res) => res.render('items', { title:"items"}));

//
app.get("/account", (req, res) => res.render('account', { title:"account"}));

//Resources
app.get("/api/maintenance-image", (req, res) => res.sendFile(path.join(__dirname, "..", "public", "img", "Maintenance-Page-Oranges.png")));


//TEST ENDPOINT
app.get("/test", requireLogin, async (req, res) => {
  const items = await inventoryService.getInventory(req.session.orgId);
  res.render("test", { items });
});

//TEST ROUTES
app.use("/api/change-request", changeRequestRouter);

//Final line
module.exports = app;

