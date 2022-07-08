const Product = require("../models/product");

exports.save = (req, res, next) => {
  const addedProd = new Product(
    null,
    req.body.title,
    req.body.description,
    req.body.price
  ).save();
  res.status(201).json(addedProd);
};

exports.getAll = (req, res, next) => {
  res.status(200).json(Product.getAll());
};

exports.deleteById = (req, res, next) => {
  res.status(200).json(Product.deleteById(req.params.productId));
};

exports.edit = (req, res, next) => {
  const prod = req.body;
  const updatedProd = new Product(
    req.params.productId,
    prod.title,
    prod.description,
    prod.price
  ).edit();
  res.status(200).json(updatedProd);
};
