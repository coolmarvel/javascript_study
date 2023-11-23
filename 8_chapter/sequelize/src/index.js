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

app.get("/users", (req, res) => {
  User.findAll()
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
});

app.get("/uesrs/:id", (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((user) => {
      if (user) res.send(user);
      else res.status(404).send({ message: `id가 ${id}인 유저가 없습니다.` });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
});

app.put("/users/:id", (req, res) => {
  const id = req.params.id;

  User.update(req.body, { where: { id } })
    .then((result) => {
      if (result == 1) res.send("success");
      else res.send(`${id}에 맞는 유저가 없습니다.`);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  User.destory({ where: { id } })
    .then((num) => {
      if (num == 1) res.send({ message: "유저가 성공적으로 삭제되었습니다." });
      else res.send({ message: `${id} 유저를 찾지 못했습니다.` });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

db.sequelize.sync({ force: false }).then(() => {
  console.log(`connected to sequelize db`);
});
