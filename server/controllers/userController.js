const User = require("../models/user");

exports.login = (req, res, next) => {
  res.status(200).json(User.login(req.body.username, req.body.password));
};

exports.getUserCart = (req, res, next) => {
  res.status(200).json(User.getUserCart(req.params.userId));
};

exports.addUserCart = (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    res.status(400).json({ error: "Invalid request body" }); //Bad Request
  else {
    const item = req.body;
    const orderItem = {
      productId: item.productId,
      quantity: item.quantity,
    };

    res.status(200).json(User.addUserCart(req.params.userId, orderItem));
  }
};

exports.updateUserCart = (req, res, next) => {
  const item = req.body;
  const orderItem = {
    productId: req.params.productId,
    quantity: item.quantity,
  };

  res.status(200).json(User.updateUserCart(req.params.userId, orderItem));
};

exports.checkoutOrder = (req, res, next) => {
  res.status(200).json(User.checkoutOrder(req.params.userId));
};
