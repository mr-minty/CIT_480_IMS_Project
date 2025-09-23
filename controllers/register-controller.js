require('dotenv').config();

const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = process.env.DB;

async function registerUser(req, res) {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  const hashedPassword = await bcrypt.hash(password, 10);
	
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Database connection failed:", err.message);
      return res.status(500).json({ error: "Database connection failed" });
    }
    console.log("DB opened successfully");

    const sqlCheck = "SELECT * FROM users WHERE username = ? OR email = ?"; //Check if User already exists
    db.get(sqlCheck, [username, email], (err, row) => {
      if (err) {
        console.error("Query failed:", err.message);
        return res.status(500).json({ error: "Database error" });
      }

      if (row) {
        // row exists → username or email already taken
        return res.status(409).json({ username: "Username or email already exists" });
      }

      //Add user to users table in database
      const sqlInsert = "INSERT INTO users(username, email, password_hash) VALUES(?, ?, ?)";
      db.run(sqlInsert, [username, email, hashedPassword], function(err) {
        if (err) {
          console.error("Insert failed:", err.message);
          return res.status(500).json({ error: "Insert failed" });
        }
        console.log("Row inserted, id:", this.lastID);
        res.status(200).json({ status: "User registered!" });
        db.close(); // close after insert
      });
    });
  });
}

module.exports = registerUser;
