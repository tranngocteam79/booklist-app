// BOOK CLASS: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI CLASS: Handles UI
const UI = {
  displayBooks() {
    // const StoreBooks = [
    //   { title: "Book One", author: "Jack", isbn: "23742397424" },
    //   { title: "Book Two", author: "Jane", isbn: "5455645" },
    // ];
    const books = Store.getBook();
    books.forEach((book) => this.addBookToList(book));
  },

  addBookToList(book) {
    const list = document.querySelector(".table-body");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><i class="far fa-window-close"></i></td>
    `;
    list.appendChild(row);
  },

  deleteBook(el) {
    el.closest("tr").remove();
  },

  showAlert(msg, className) {
    const alertEl = document.createElement("p");
    alertEl.classList.add(`alert-${className}`);
    alertEl.textContent = msg;
    document.querySelector(".alert").appendChild(alertEl);

    // Alert should be disappeared after 3 secs
    setTimeout(() => {
      alertEl.remove();
    }, 3000);
  },

  clearField() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  },
};

// STORE CLASS : Handles Storage
const Store = {
  getBook() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  },

  addBook(book) {
    const books = this.getBook();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  },

  removeBook(isbn) {
    let books = this.getBook();
    books = books.filter((book) => book.isbn !== isbn);
    localStorage.setItem("books", JSON.stringify(books));
  },
};

// EVENT: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks.bind(UI)); //https://trekinbami.medium.com/its-not-magic-using-bind-in-javascript-18834e95cd8e

// EVENT: Add a Book
document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  // Get form value
  title = document.querySelector("#title").value;
  author = document.querySelector("#author").value;
  isbn = document.querySelector("#isbn").value;

  // Validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "fill");
    return;
  }

  // Instatiate a book
  const book = new Book(title, author, isbn);
  console.log(book);

  // Add book to UI
  UI.addBookToList(book);

  // Add book to localStorage
  Store.addBook(book);

  // Show success message
  UI.showAlert("Book added", "added");

  // Clear field
  UI.clearField();
});

// EVENT: Remove a Book
document.querySelector(".table-body").addEventListener("click", (e) => {
  if (!e.target.classList.contains("fa-window-close")) return;

  // Remove book from UI
  UI.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Remove book from localStorage
  UI.showAlert("Book removed", "removed");
});
