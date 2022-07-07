const path = require("path");
const express = require("express");
const routers = express.Router();

let products = [
  { name: "Product 1", desc: "product one description", cat: "food" },
  { name: "Product 2", desc: "product two description", cat: "movie" },
  { name: "Product 3", desc: "product three description", cat: "furniture" },
];

routers.get("/view", function (req, res) {
  if (JSON.stringify(req.query) != "{}") {
    throw new Error("You can not pass query params.");
  } else {
    res.render(
      path.join(__dirname, "..", "public", "views", "productView.html"),
      { products: products }
    );
  }
});

routers.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "public", "views", "product.html"));
});

routers.get("/add", (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "views", "productAdd.html")
  );
});

routers.post(
  "/save",
  express.urlencoded({ extended: true }),
  (req, res, next) => {
    if (JSON.stringify(req.body) != "{}") {
      if (Object.keys(req.body).length != 3) {
        console.log(req.body);
        throw new Error("Please fill the form correctly!");
      } else {
        products.push({
          name: req.body.name,
          desc: req.body.desc,
          cat: req.body.cat,
        });
        res.redirect("/products/view");
      }
    } else throw new Error("Please fill the form!");
  }
);

module.exports = routers;
