const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require("path");

const dbPath = process.env.DB;

function renderTable(req, res) {
  const userId = req.session.userId;
  if (!userId) {
    return res.redirect("/login"); // or return 401
  }

  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      return res.status(500).send("Database error 1");
    }
	
    const sqlGet = "SELECT * FROM users;"//WHERE id=?";
    db.all(sqlGet, (err, rows) => {
    if(err) {
      console.log("DB Error: " + err);
      return res.status(500).json({ error: "Database error 2"});
    }
    if (!rows) {
      return res.redirect("/login");
    }
    res.render('table', { rows });
    db.close();
    });
  })
}
module.exports = renderTable