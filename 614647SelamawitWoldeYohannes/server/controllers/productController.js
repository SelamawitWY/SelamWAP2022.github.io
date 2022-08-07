const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  res.status(200).json(Product.getAll());
};

exports.getProductById = (req, res, next) => {
  res.status(200).json(Product.getById(req.params.productId));
};
