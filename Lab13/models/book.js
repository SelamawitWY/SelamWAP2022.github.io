let books = [];
let counter = 0;

module.exports = class Book {
  constructor(id, title, ISBN, publishedDate, author) {
    this.id = id;
    this.title = title;
    this.ISBN = ISBN;
    this.publishedDate = publishedDate;
    this.author = author;
  }

  save() {
    this.id = ++counter;
    books.push(this);
    return this;
  }

  static getAll() {
    return books;
  }

  static deleteById(id) {
    const index = books.findIndex((book) => book.id == id);

    if (index > -1) {
      const deletedBook = books[index];
      books.splice(index, 1);
      return deletedBook;
    } else {
      throw new Error("Book not Found");
    }
  }

  edit() {
    const index = books.findIndex((book) => book.id == this.id);
    if (index > -1) {
      books.splice(index, 1, this);
      return this;
    } else {
      throw new Error("Book not Found");
    }
  }
};
