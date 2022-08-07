const products = require("../database/product").products;

module.exports = class Product {
  constructor(productId, name, price, image, stock) {
    this.productId = productId;
    this.name = name;
    this.stock = stock;
    this.price = price;
    this.image = image;
  }

  static getAll() {
    return products;
  }

  edit() {
    const index = products.findIndex((prod) => prod.productId == this.id);
    if (index > -1) {
      products.splice(index, 1, this);
      return this;
    } else {
      throw new Error("Product not Found");
    }
  }

  static getById(productId) {
    const index = products.findIndex((prod) => prod.productId == productId);

    if (index > -1) {
      return products[index];
    } else {
      throw new Error("Product not Found");
    }
  }
};
