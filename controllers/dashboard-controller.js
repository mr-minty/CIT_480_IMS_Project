const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require("path");

const dbPath = process.env.DB;

function renderDashboard(req, res) {
  const userId = req.session.userId;

  if (!userId) {
    return res.redirect("/login"); // or return 401
  }

  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Database error"); 
    }
  });

  const sqlGet = "SELECT * FROM users WHERE id=?";
  db.get(sqlGet, [userId], (err, row) => {
    if (err) {
      console.error("Query failed:", err.message);
      return res.status(500).json({ error: "Database error" });
    }
    if (!row) {
      return res.redirect("/login");
    }

    res.render('dashboard', {
      title: "Dashboard",
      heading: "Welcome",
      content: "...",
      user: row
    });

    db.close();
  });
}

module.exports = renderDashboard;
