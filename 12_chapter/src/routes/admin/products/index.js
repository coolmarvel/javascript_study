const router = require("express").Router();

const fs = require("fs-extra");
const Resizeimg = require("resize-img");

const { Product } = require("../../../models/products.model");
const { Category } = require("../../../models/categories.model");

const { checkAdmin } = require("../../../middleware/auth");

router.get("/", checkAdmin, async (req, res, next) => {
  try {
    const products = await Product.find();

    res.render("admin/products", { products });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/add-product", checkAdmin, async (req, res, next) => {
  try {
    const categories = await Category.find();
    console.log(categories);

    res.render("admin/add-product", { categories });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/", checkAdmin, async (req, res, next) => {
  const imageFile = req.files.image.name;
  const { title, desc, price, category } = req.body;
  const slug = title.replace(/\s+/g, "-").toLowerCase();

  try {
    // 데이터베이스에 데이터 저장
    const newProduct = new Product({ title, desc, price, slug, category, image: imageFile });
    await newProduct.save();

    // 이미지를 담을 폴더를 생성
    await fs.mkdirp("src/public/product-images/" + newProduct._id);
    await fs.mkdirp("src/public/product-images/" + newProduct._id + "/gallery");
    await fs.mkdirp("src/public/product-images/" + newProduct._id + "gallery/thumbs");

    // 이미지 파일을 폴더에 넣어주기
    const productImage = req.files.image;
    const path = "src/public/product-images/" + newProduct._id + "/" + imageFile;
    await productImage.mv(path);

    req.flash("success", "상품이 추가되었습니다.");
    res.redirect("/admin/products");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
