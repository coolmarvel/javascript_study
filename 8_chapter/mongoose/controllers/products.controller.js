const productModel = require("../models/products.model");

const createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body);

    res.status(201).send(createdProduct);
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const allProducts = await productModel.find({});

    res.status(200).send(allProducts);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.prouctId);

    if (product) res.status(200).send(product);
    else res.status(404).send();
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(req.params.productId, req.body, { new: true });

    if (updatedProduct) res.status(200).send(updatedProduct);
    else res.status(404).send();
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.productId);

    if (deletedProduct) res.status(200).send(deletedProduct);
    else res.status(404).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
