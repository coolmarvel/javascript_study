import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res) => res.send("running"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

AppDataSource.initialize()
  .then(() => console.log("success"))
  .catch((err) => console.log(err));
