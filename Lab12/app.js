/**
 * 
 * Instructions

1. Create a npm project and install Express.js (Nodemon if you want)
2. Change your Express.js app which serves HTML files (of your choice with your content) for “/”, “/users” and “/products”.
3. For “/users” and “/products”, provides GET and POST requests handling (of your choice with your content) in different routers. 
4. Add some static (.js or .css) files to your project that should be required by at least one of your HTML files.
5. Customize your 404 page
6. Provide your own error handling
 */
const express = require("express");
const path = require("path");
const fs = require("fs");

const product = require("./routers/product");
const user = require("./routers/user");
const app = express();

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.listen(3000, () => {
  console.log("Your Server is running on 3000");
});

app.get(express.urlencoded({ extended: true }));
app.use("/cssFiles", express.static(path.join(__dirname, "public", "css")));
app.use(
  "/imageFiles",
  express.static(path.join(__dirname, "public", "images"))
);

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "views", "home.html"));
});

app.use("/products", product);
app.use("/users", user);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "public", "views", "404.html"));
});

app.use(function (error, request, response, next) {
  let html = fs.readFileSync(
    path.join(__dirname, "public", "views", "500Error.html"),
    "utf8"
  );
  html = html.replace("{error}", error);

  response.status(500).end(html);
});
