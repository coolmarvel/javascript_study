const router = require("express").Router();

const cartRouter = require("./cart");
const usersRouter = require("./users");
const productsRouter = require("./products");

router.use("/", cartRouter);
router.use("/auth", usersRouter);
router.use("/", productsRouter);

module.exports = router;
