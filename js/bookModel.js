import { getBooksFromStorage} from "./books.js";
import { addBook,updateBook,getList } from "./bookCRUD.js";
import { Book } from "./bookInterface.js";

let isUpdating = false;
let currentBookId = null;

document.getElementById('coverUrl').addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgPreview = document.getElementById('coverPreview');
            imgPreview.src = e.target.result;
            imgPreview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const book = new Book(
        document.getElementById('id').value,
        document.getElementById('title').value,
        document.getElementById('price').value,
        document.getElementById('coverPreview').src
    );

    if (isUpdating) {
        book.id = currentBookId;
        updateBook(book);
        isUpdating = false;
        currentBookId = null;
    } else {
        addBook(book);
    }

    // Reset the form
    document.getElementById('bookForm').reset();
    document.getElementById('coverPreview').style.display = 'none';
    document.getElementById('bookModal').style.display = 'none';
    
    getList();
});

export function showUpdateForm(bookId) {
    const booksData = getBooksFromStorage();
    const bookToEdit = booksData.books.find(book => book.id == bookId);

    if (bookToEdit) {
        document.getElementById('id').value = bookToEdit.id;
        document.getElementById('title').value = bookToEdit.title;
        document.getElementById('price').value = bookToEdit.price;
        document.getElementById('coverPreview').src = bookToEdit.image;
        document.getElementById('coverPreview').style.display = 'block';

        currentBookId = bookToEdit.id;
        isUpdating = true;
        document.getElementById('bookModal').style.display = 'block';
    } else {
        console.error("Book not found for update:", bookId);
    }
}