const router = require("express").Router();

const productsController = require("../controllers/products.controller");

router.post("/", productsController.createProduct);
router.get("/", productsController.getProducts);
router.get("/:productId", productsController.getProductById);
router.put("/:productId", productsController.updateProduct);
router.delete("/:productId", productsController.deleteProduct);

module.exports = router;
