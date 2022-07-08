const Book = require("../models/book");

exports.save = (req, res, next) => {
  const addedBook = new Book(
    null,
    req.body.title,
    req.body.ISBN,
    req.body.publishedDate,
    req.body.author
  ).save();
  res.status(201).json(addedBook);
};

exports.getAll = (req, res, next) => {
  res.status(200).json(Book.getAll());
};

exports.deleteById = (req, res, next) => {
  res.status(200).json(Book.deleteById(req.params.bookId));
};

exports.edit = (req, res, next) => {
  const updatedBook = new Book(
    req.params.bookId,
    req.body.title,
    req.body.ISBN,
    req.body.publishedDate,
    req.body.author
  ).edit();

  res.status(200).json(updatedBook);
};
