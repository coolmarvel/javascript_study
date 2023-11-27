const router = require("express").Router();

const categoriesRouter = require("./categories.router");

const productsRouter = require("./products.router");

router.use("/", categoriesRouter);
// router.use("/", productsRouter);

module.exports = router;
