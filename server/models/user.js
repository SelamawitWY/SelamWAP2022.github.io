const users = require("../database/user").users;
const products = require("../database/product").products;
const OrderItem = require("../models/orderItem");

module.exports = class User {
  constructor(userId, username, password, token, shoppingCart) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.token = token;
    this.shoppingCart = shoppingCart;
  }

  static login(username, password) {
    // users.forEach((user) => (user.token = "")); //one user at a time

    let loginUser = users.find(
      (user) => user.username == username && user.password == password
    );

    if (loginUser == null || loginUser == undefined) {
      throw new Error("Invalid user name or password.");
    } else {
      loginUser.token =
        loginUser.userId +
        "-" +
        loginUser.username +
        "-" +
        Math.ceil(Date.now());
      const index = users.findIndex(
        (user) => user.username == username && user.password == password
      );
      users.splice(index, 1, loginUser);
      return { accessToken: loginUser.token };
    }
  }

  static getUserCart(userId) {
    const index = users.findIndex((user) => user.userId == userId);

    if (index > -1) {
      return users[index].shoppingCart;
    } else {
      throw new Error("User not Found");
    }
  }

  editCart(orderItem) {
    let product = products.find(
      (prod) => prod.productId == parseInt(orderItem.productId)
    );

    if (!product) {
      throw new Error("Product not Found");
    }

    let oldItemIndex = this.shoppingCart.findIndex(
      (item) => item.productId == orderItem.productId
    );

    if (oldItemIndex > -1) {
      if (parseInt(orderItem.quantity) > product.stock) {
        throw new Error(
          `Sorry, have only ${product.stock} ${product.name} product in stock.`
        );
      }

      let oldItem = this.shoppingCart[oldItemIndex];

      if (parseInt(orderItem.quantity) == 0) {
        this.shoppingCart.splice(oldItemIndex, 1);
      } else {
        oldItem.quantity = orderItem.quantity;
      }
    } else {
      throw new Error(
        `Sorry, you didn't add product ${product.name}  in your cart.`
      );
    }

    return this.shoppingCart;
  }

  addCart(orderItem) {
    let product = products.find(
      (prod) => prod.productId == parseInt(orderItem.productId)
    );

    if (!product) {
      throw new Error("Product not Found");
    }

    if (parseInt(orderItem.quantity) > product.stock) {
      throw new Error(
        `Sorry, have only ${product.stock} ${product.name} product in stock.`
      );
    }

    if (this.shoppingCart.length > 0) {
      let oldItemIndex = this.shoppingCart.findIndex(
        (item) => item.productId == orderItem.productId
      );

      if (oldItemIndex > -1) {
        let oldItem = this.shoppingCart[oldItemIndex];

        if (parseInt(orderItem.quantity) == 0) {
          this.shoppingCart.splice(oldItemIndex, 1);
        } else {
          oldItem.quantity = orderItem.quantity;
        }
      } else if (parseInt(orderItem.quantity) > 0) {
        this.shoppingCart.push(
          new OrderItem(
            product.productId,
            product.name,
            product.price,
            orderItem.quantity
          )
        );
      }
    } else if (parseInt(orderItem.quantity) > 0) {
      this.shoppingCart.push(
        new OrderItem(
          product.productId,
          product.name,
          product.price,
          orderItem.quantity
        )
      );
    }

    return this.shoppingCart;
  }

  checkoutCart() {
    this.shoppingCart.forEach((item) => {
      let product = products.find((prod) => prod.productId == item.productId);
      if (product.stock < item.quantity) {
        let message =
          product.stock == 0
            ? `Sorry, your order(${product.name}) is out of stock, please refetch available products.`
            : `Sorry, have only ${product.stock} ${product.name} product in stock.`;

        throw new Error(message);
      }
    });

    this.shoppingCart.forEach((item) => {
      let product = products.find((prod) => prod.productId == item.productId);
      product.stock = product.stock - item.quantity;
    });

    this.deleteCart();
    return { cart: this.shoppingCart, products: products };
  }

  deleteCart() {
    const index = users.findIndex((user) => user.userId == this.userId);

    if (index > -1) {
      this.shoppingCart = [];
      users[index].shoppingCart = [];
    } else {
      throw new Error("User not Found");
    }
  }

  static getUserById(id) {
    const index = users.findIndex((user) => user.userId == id);

    if (index > -1) {
      let user = new User(
        users[index].userId,
        users[index].username,
        users[index].password,
        users[index].token,
        users[index].shoppingCart
      );

      return user;
    } else {
      throw new Error("User not Found");
    }
  }

  static addUserCart(userId, orderItem) {
    let user = this.getUserById(userId);
    return user.addCart(orderItem);
  }

  static updateUserCart(userId, orderItem) {
    let user = this.getUserById(userId);
    return user.editCart(orderItem);
  }

  static checkoutOrder(userId) {
    let user = this.getUserById(userId);
    return user.checkoutCart();
  }

  static verifyUser(token) {
    token = token.split(" ")[1];
    return users.find((user) => user.token == token) ? true : false;
  }
};
