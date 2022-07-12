/*
1. List all books in index.html when open index.html in browser
2. Click "Submit" button to add a new book with properties: title, ISBN, publishedDate, author (id is auto generated)
3. Click "Update" button to Edit a book and save to server side
4. Click "Delete" button to remove a book from server side
 */
var bookId = null;
let bookDb = [];
window.onload = function () {
  fetch("http://localhost:3000/books")
    .then((response) => response.json())
    .then((books) => {
      bookDb = books;

      let html = "";
      books.forEach((book) => {
        html += `
              <tr id=${book.id}>
                <td>${book.title}</td>
                <td>${book.ISBN}</td>
                <td>${book.publishedDate}</td>
                <td>${book.author}</td>
                <td>
                <button id=${book.id} class="updateButton mr-4">
                  <a> Update </a>
                </button>
                <button id=${book.id} class="deleteButton">
                  <a> Delete</a>
                </button>
              </td>
              </tr>
            `;
      });

      document.getElementById("content").innerHTML = html;
      this.addButtonAction(books);
    });

  document.getElementById("submitBtn").onclick = async function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const ISBN = document.getElementById("isbn").value;
    const publishedDate = document.getElementById("publishedDate").value;
    const author = document.getElementById("author").value;
    let url = bookId
      ? `http://localhost:3000/books/${bookId}`
      : "http://localhost:3000/books";
    let method = bookId ? "PUT" : "POST";
    let result = await fetch(url, {
      method: method,
      body: JSON.stringify({
        title: title,
        ISBN: ISBN,
        publishedDate: publishedDate,
        author: author,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const book = await result.json();

    if (bookId) {
      let index = bookDb.findIndex((elem) => elem.id == book.id);
      bookDb.splice(index, 1, book);
    }

    bookId ? updateTable(bookId, book) : appendToTable(book);
    bookId = null;
  };
};

function addButtonAction(bookDb) {
  var buttons = document.getElementsByClassName("updateButton");
  Array.from(buttons).forEach((button) => {
    button.onclick = function () {
      bookId = this.id;
      const selectedBook = bookDb.find((elem) => elem.id == this.id);

      document.getElementById("title").value = selectedBook.title;
      document.getElementById("isbn").value = selectedBook.ISBN;
      document.getElementById("publishedDate").value =
        selectedBook.publishedDate;
      document.getElementById("author").value = selectedBook.author;

      document.getElementById("submitBtn").innerHTML = "Update";
      document.getElementById("headerTitie").innerHTML = "Update Book";
    };
  });

  let deleteButtons = document.getElementsByClassName("deleteButton");
  Array.from(deleteButtons).forEach((button) => {
    button.onclick = function () {
      deleteBook(this.id);
    };
  });
}

function updateTable(rowId, book) {
  let tbody = document.getElementById("content").rows;
  let selectedRow = Array.from(tbody).find((row) => row.id == rowId).cells;

  selectedRow[0].innerHTML = book.title;
  selectedRow[1].innerHTML = book.ISBN;
  selectedRow[2].innerHTML = book.publishedDate;
  selectedRow[3].innerHTML = book.author;
  document.getElementById("submitBtn").innerHTML = "Add";
  document.getElementById("headerTitie").innerHTML = "Add Book";
}

function appendToTable(book) {
  document.getElementById("content").innerHTML += `
             <tr>
                <td>${book.title}</td>
                <td>${book.ISBN}</td>
                <td>${book.publishedDate}</td>
                <td>${book.author}</td>
                <td>
                <button id=${book.id} class="updateButton mr-4">
                  <a> Update </a>
                </button>
                <button class="deleteButton">
                  <a> Delete</a>
                </button>
              </td>
            </tr>
       `;
}

async function deleteBook(bookId) {
  let result = await fetch(`http://localhost:3000/books/${bookId}`, {
    method: "DELETE",
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const book = await result.json();
  let tbody = document.getElementById("content");
  let rowIndex = Array.from(tbody.rows).findIndex(
    (row) => row.id == bookId
  ).cells;
  tbody.deleteRow(rowIndex);

  let index = bookDb.findIndex((elem) => elem.id == book.id);
  bookDb.splice(index, 1);

  bookId = null;
}
