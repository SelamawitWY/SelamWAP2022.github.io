const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/login", userController.login);

router.get("/:userId/carts", userController.getUserCart);

router.post("/:userId/carts", userController.addUserCart);

router.put("/:userId/carts/:productId", userController.updateUserCart);

router.post("/:userId/cart/checkout", userController.checkoutOrder);

router.use((err, req, res, next) => {
  if (err.message) {
    res.status(401).json({ error: err.message });
  }
});

module.exports = router;
