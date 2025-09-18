require('dotenv').config();

const sqlite3 = require('sqlite3').verbose();
const path = require("path");
const bcrypt = require("bcrypt");

const dbPath = path.join(process.env.DB);

async function loginUser(req, res) {
  const { username, password } = req.body;
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }
    console.log("DB connection successful.");
  });

const sqlCheck = "SELECT * FROM users WHERE username = ? OR email = ?";	
db.get(sqlCheck, [username, username], async (err, row) => {
   if (err) {
      console.error("Query failed:", err.message);
      return res.status(500).json({ error: "Database error" });
   }

   if (!row) {
	return res.status(401).json({ error: "Invalid username/email or password." });
   }
   const match = await bcrypt.compare(password, row.password_hash);
   if (!match){
     return res.status(401).json({ error: "Invalid username/email or password." });
   }
     
   req.session.userId = row.id;
   console.log("Session after login:", req.session);
   res.status(200).json({ status: "OK" });

   db.close();
  });
}

module.exports = loginUser;

