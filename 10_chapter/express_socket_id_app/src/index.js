const express = require("express");

const app = express();

const publicDir = path.join(__dirname, "../public");

app.use(express.static(publicDir));

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
