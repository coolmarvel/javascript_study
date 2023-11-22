import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import { User } from "./entities/User.entity";

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res) => res.send("running"));

app.post("/users", async (req, res) => {
  const user = await AppDataSource.getRepository(User).create(req.body);
  console.log(user);

  const results = await AppDataSource.getRepository(User).save(user);
  return res.send(results);
});

app.get("/users", async (req, res) => {
  const results = await AppDataSource.getRepository(User).find();

  res.send(results);
});

app.get("/users/:id", async (req, res) => {
  const user = await AppDataSource.getRepository(User).findOneBy({ id: Number(req.params.id) });

  return res.send(user);
});

app.put("/users/:id", async (req, res) => {
  const user = await AppDataSource.getRepository(User).findOneBy({ id: Number(req.params.id) });

  AppDataSource.getRepository(User).merge(user, req.body);

  const result = await AppDataSource.getRepository(User).save(user);

  return res.send(result);
});

app.delete("/users/:id", async (req, res) => {
  const result = await AppDataSource.getRepository(User).delete(req.params.id);

  res.send(result);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

AppDataSource.initialize()
  .then(() => console.log("success"))
  .catch((err) => console.log(err));
