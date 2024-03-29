const router = require("express").Router();

const categoriesRouter = require("./categories");
const productsRouter = require("./products");

router.use("/", categoriesRouter);
router.use("/", productsRouter);

module.exports = router;
