import {
  getBooksFromStorage,
  bookDisaplay,
  closeBook,
  saveBooksToStorage,
  sortBooksByPrice,
  sortBooksByTitle,
} from "./books.js";
import { showUpdateForm } from "./bookModel.js";

// Function to get the list of books and display them
export function getList() {
  const booksData = getBooksFromStorage();

  let bookListDiv = document.querySelector(".bookList");
  bookListDiv.innerHTML = "";

  const headers = ["Id", "Title", "Price", "Action"];

  // Loop through the headers to create and append them
  headers.forEach((header) => {
    const headerDiv = document.createElement("div");
    headerDiv.className = "grid-header";

    if (header === "Price") {
      headerDiv.textContent = "Price";

      const ascButton = document.createElement("button");
      ascButton.textContent = "▲";
      ascButton.style =
        "border: none; background: transparent; cursor: pointer;";
      ascButton.addEventListener("click", () => sortBooksByPrice("asc"));

      const descButton = document.createElement("button");
      descButton.textContent = "▼";
      descButton.style =
        "border: none; background: transparent; cursor: pointer;";
      descButton.addEventListener("click", () => sortBooksByPrice("desc"));

      headerDiv.appendChild(ascButton);
      headerDiv.appendChild(descButton);
    } else if (header === "Title") {
      headerDiv.textContent = "Title";

      const ascButton = document.createElement("button");
      ascButton.textContent = "▲";
      ascButton.style =
        "border: none; background: transparent; cursor: pointer;";
      ascButton.addEventListener("click", () => sortBooksByTitle("asc"));

      const descButton = document.createElement("button");
      descButton.textContent = "▼";
      descButton.style =
        "border: none; background: transparent; cursor: pointer;";
      descButton.addEventListener("click", () => sortBooksByTitle("desc"));

      headerDiv.appendChild(ascButton);
      headerDiv.appendChild(descButton);
    } else {
      headerDiv.textContent = header;
    }

    bookListDiv.appendChild(headerDiv);
  });

  // Loop through the books to display them in the grid
  booksData.books.forEach((book) => {
    const idDiv = document.createElement("div");
    idDiv.className = "book-item";
    idDiv.textContent = book.id;

    const titleDiv = document.createElement("div");
    titleDiv.className = "book-item";
    titleDiv.textContent = book.title;

    const priceDiv = document.createElement("div");
    priceDiv.className = "book-item";
    priceDiv.textContent = book.price;

    const actionDiv = document.createElement("div");
    actionDiv.className = "book-item";

    const buttonRead = document.createElement("button");
    buttonRead.className = "book-btn";
    buttonRead.textContent = "Read";
    buttonRead.onclick = () => getBookById(book.id);

    const buttonUpdate = document.createElement("button");
    buttonUpdate.className = "book-btn update";
    buttonUpdate.textContent = "Update";
    buttonUpdate.onclick = () => showUpdateForm(book.id);

    const buttonDelete = document.createElement("button");
    buttonDelete.className = "book-btn delete";
    buttonDelete.textContent = "Delete";
    buttonDelete.onclick = () => deleteBook(book.id);

    actionDiv.appendChild(buttonRead);
    actionDiv.appendChild(buttonUpdate);
    actionDiv.appendChild(buttonDelete);

    bookListDiv.appendChild(idDiv);
    bookListDiv.appendChild(titleDiv);
    bookListDiv.appendChild(priceDiv);
    bookListDiv.appendChild(actionDiv);
  });
}

// Function to retrieve a book by its ID and display it
function getBookById(bookId) {
  const booksData = getBooksFromStorage();
  const book = booksData.books.find((book) => book.id == bookId);

  if (book) {
    localStorage.setItem("currentBook", JSON.stringify(book));
    bookDisaplay(book);
  } else {
    console.error("Book not found.");
  }
}

// Function to delete a book by its ID
function deleteBook(bookId) {
  let booksData = getBooksFromStorage();
  booksData.books = booksData.books.filter((book) => book.id !== bookId);

  saveBooksToStorage(booksData);
  localStorage.removeItem(`bookRating_${bookId}`);

  // Remove the current book from localStorage if it's the one being deleted
  const storedBook = localStorage.getItem("currentBook");

  if (storedBook) {
    const currentBook = JSON.parse(storedBook);
    if (currentBook.id == bookId) {
      localStorage.removeItem("currentBook");
      closeBook();
    }
  }

  getList();
}

// Function to add a new book
export function addBook(newBook) {
  let booksData = getBooksFromStorage();

  if (!booksData.books) {
    booksData.books = [];
  }

  booksData.books.push(newBook);
  saveBooksToStorage(booksData);
}

// Function to update an existing book
export function updateBook(updatedBook) {
  let booksData = getBooksFromStorage();

  const index = booksData.books.findIndex((book) => book.id === updatedBook.id);
  if (index !== -1) {
    booksData.books[index] = updatedBook;
    saveBooksToStorage(booksData);

    // Check if the updated book is currently displayed in the readBook section
    const storedBook = localStorage.getItem("currentBook");
    if (storedBook) {
      const currentBook = JSON.parse(storedBook);
      if (currentBook.id === updatedBook.id) {
        // Update the current book in local storage and refresh the display
        localStorage.setItem("currentBook", JSON.stringify(updatedBook));
        bookDisaplay(updatedBook); // Refresh the readBook display
      }
    }
  } else {
    console.error("Book not found:", updatedBook.id);
  }
}

getList();
