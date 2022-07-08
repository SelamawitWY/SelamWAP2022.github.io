let db = [];
let counter = 0;

module.exports = class Product {
  constructor(id, title, description, price) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = ++counter;
    db.push(this);
    return this;
  }

  static getAll() {
    return db;
  }

  static deleteById(prodId) {
    const index = db.findIndex((prod) => prod.id == prodId);

    if (index > -1) {
      const deletedProd = db[index];
      db.splice(index, 1);
      return deletedProd;
    } else {
      throw new Error("Product not Found");
    }
  }

  edit() {
    const index = db.findIndex((prod) => prod.id == this.id);
    if (index > -1) {
      db.splice(index, 1, this);
      return this;
    } else {
      throw new Error("Product not Found");
    }
  }

  static findById(productId) {
    const index = db.findIndex((p) => p.id === productId);
    if (index > -1) {
      return products[index];
    } else {
      throw new Error("NOT Found");
    }
  }
};
