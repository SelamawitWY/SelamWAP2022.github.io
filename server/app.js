const express = require("express");
const path = require("path");
const cors = require("cors");
const User = require("./models/user");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/imageFiles", express.static(path.join(__dirname, "assets")));

app.use(function (req, res, next) {
  if (
    req.url != "/users/login" &&
    !User.verifyUser(req.headers.authorization)
  ) {
    return res.status(401).json({ error: "Unauthorized user!" }); //Unauthorized
  }
  next();
});

app.use("/products", productRouter);
app.use("/users", userRouter);

app.use((req, res, next) => {
  res
    .status(404)
    .json({ error: req.method + " " + req.url + " API is not defined!" }); //not dound
});

app.use((err, req, res, next) => {
  if (err.message) {
    res.status(404).json({ error: err.message }); //not dound
  } else {
    res.status(500).json({ error: "Something is wrong! Try later" });
  }
});

app.listen(3000, () => console.log("listening to 3000..."));
