//server.js

require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


/*
--Make a first 'git commit'--

git init
git add .
git commit -m "Initial project skeleton"
git branch -M main
git remote add origin <your_repo_url>
git push -u origin main

*/