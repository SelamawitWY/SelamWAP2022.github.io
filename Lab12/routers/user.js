const express = require("express");
const path = require("path");
const routers = express.Router();

let usersOrg = [
  { name: "Jhon", lname: "Smith", title: "Software developer" },
  { name: "Edward", lname: "Rene", title: "Medical Doctor" },
  { name: "David", lname: "Mark", title: "Lawyer" },
];

let users = usersOrg;

routers.get("/", function (req, res) {
  if (JSON.stringify(req.query) != "{}") {
    throw new Error("You can not pass query params.");
  } else {
    users = usersOrg;
    res.render(path.join(__dirname, "..", "public", "views", "userView.html"), {
      users: users,
    });
  }
});
routers.get("/list", function (req, res) {
  if (JSON.stringify(req.query) != "{}") {
    throw new Error("You can not pass query params.");
  } else {
    res.render(path.join(__dirname, "..", "public", "views", "userView.html"), {
      users: users,
    });
  }
});

routers.post(
  "/filter",
  express.urlencoded({ extended: true }),
  (req, res, next) => {
    console.log(req.body);
    if (JSON.stringify(req.body) != "{}") {
      if (Object.keys(req.body).length != 1 || req.body.search == "") {
        console.log(req.body);
        throw new Error("Please fill the form correctly!");
      } else {
        users = usersOrg.filter(
          (elem, i, array) =>
            elem.name.toUpperCase() === req.body.search.toUpperCase()
        );
        res.redirect("/users/list");
      }
    } else throw new Error("Please fill the form!");
  }
);
module.exports = routers;
