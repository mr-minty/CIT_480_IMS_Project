//Dotenv
require("dotenv").config();

//Node modules
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express()

//Middleware
app.use(express.urlencoded({ extended: true })); // parses form submissions
app.use(express.json()); // parses JSON payloads

//Set EJS as templating engine
app.set('view engine', 'ejs');

//Session config
const isProd = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1); // only really needed in prod behind proxy

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProd,        // 🔑 only true in production
    sameSite: isProd ? 'lax' : 'lax' // can keep same, or tweak if needed
  }
}));

//Routes
const routes = require('../routes');
app.use('/', routes);

//Final line
module.exports = app;

