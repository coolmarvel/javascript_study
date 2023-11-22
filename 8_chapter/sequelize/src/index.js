const express = require("express");
const morgan = require("morgan");

const db = require("./models");
const User = db.users;

const app = express();

const port = 3000;

app.use(express.json());
app.use(morgan("dev"));

app.post("/users", (req, res) => {
  const { firstName, lastName, hasCar } = req.body;

  const user = { firstName, lastName, hasCar };

  User.create(user)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

db.sequelize.sync({ force: false }).then(() => {
  console.log(`connected to sequelize db`);
});
