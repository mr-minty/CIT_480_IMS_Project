const app = require("./src/app.js");

const port = process.env.PORT;

//start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
