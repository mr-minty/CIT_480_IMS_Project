require("dotenv").config();

const express = require("express")
const session = require("express-session");
const path = require("path")

const registerRouter = require("../routes/register-route.js");
const loginRouter = require("../routes/login-route.js");
const dashboardRouter = require("../routes/dashboard-route.js");

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
app.use("/dashboard", dashboardRouter);



//Pages
app.get("/", (req, res) => res.render('index'));
app.get("/login", (req, res) => res.render('login'));
app.get("/create-account", (req, res) => res.render('create-account'));


//TEST ENDPOINT
app.get("/test", (req, res) => res.render('test'));

module.exports = app;
