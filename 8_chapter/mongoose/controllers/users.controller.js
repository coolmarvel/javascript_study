const model = require("../models/users.model");

const getUsers = (req, res) => {
  res.send(model);
};

const getUser = (req, res) => {
  const userId = Number(req.params.userId);
  const user = model[userId];

  if (user) res.status(200).send(user);
  else res.status(404).send({ error: "Not User Found" });
};

const postUser = (req, res) => {
  if (!req.body.name) return res.status(400).send({ error: "Missing user name" });

  const newUser = { name: req.body.name, id: users.length };
  model.push(newUser);

  res.send(newUser);
};

model.exports = { getUser, getUsers, postUser };
