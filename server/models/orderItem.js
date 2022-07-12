module.exports = class OrderItem {
  constructor(productId, productName, price, quantity) {
    this.price = price;
    this.productId = productId;
    this.productName = productName;
    this.quantity = quantity;
  }
};
