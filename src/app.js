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

//Test Route Handlers
const changeRequestRouter = require("../routes/change-request-route.js")

//External middleware
const requireLogin = require("../middleware/auth.js");

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


//TEST ENDPOINT
app.get("/test", (req, res) => res.render('test', {

}));

//TEST ROUTES
app.use("/api/change-request", changeRequestRouter);

//Final line
module.exports = app;

