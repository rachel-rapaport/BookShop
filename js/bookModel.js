import { getBooksFromStorage } from "./books.js";
import { addBook, updateBook, getList } from "./bookCRUD.js";
import { Book } from "./bookInterface.js";

let isUpdating = false; // Flag to track if we are in update mode
let currentBookId = null; // Store the current book ID when updating

// Event listener for when a new book cover image is selected
document
  .getElementById("coverUrl")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgPreview = document.getElementById("coverPreview");
        imgPreview.src = e.target.result;
        imgPreview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

// Event listener for when the book form is submitted
document
  .getElementById("bookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Create a new book object using the form values
    const book = new Book(
      document.getElementById("id").value,
      document.getElementById("title").value,
      document.getElementById("price").value,
      document.getElementById("coverPreview").src
    );

    // If in update mode, update the existing book, otherwise add a new book
    if (isUpdating) {
      book.id = currentBookId;
      updateBook(book);
      isUpdating = false;
      currentBookId = null;
    } else {
      addBook(book);
    }

    // Reset the form
    document.getElementById("bookForm").reset();
    document.getElementById("coverPreview").style.display = "none";
    document.getElementById("bookModal").style.display = "none";

    getList();
  });

// Function to show the update form and populate it with the selected book's details
export function showUpdateForm(bookId) {
  const booksData = getBooksFromStorage();
  const bookToEdit = booksData.books.find((book) => book.id == bookId);

  // If the book is found, populate the form with its details
  if (bookToEdit) {
    document.getElementById("id").value = bookToEdit.id;
    document.getElementById("title").value = bookToEdit.title;
    document.getElementById("price").value = bookToEdit.price;
    document.getElementById("coverPreview").src = bookToEdit.image;
    document.getElementById("coverPreview").style.display = "block";

    currentBookId = bookToEdit.id;
    isUpdating = true;
    document.getElementById("bookModal").style.display = "block";
  } else {
    console.error("Book not found for update:", bookId);
  }
}
