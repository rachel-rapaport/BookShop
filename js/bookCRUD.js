import { getBooksFromStorage,bookDisaplay,closeBook,saveBooksToStorage,sortBooksByPrice,sortBooksByTitle } from "./books.js";
import { showUpdateForm } from "./bookModel.js";

export function getList() {
    const booksData = getBooksFromStorage();

    let bookListDiv = document.querySelector(".bookList");
    bookListDiv.innerHTML = "";

    const headers = ['Id', 'Title', 'Price', 'Action'];

    headers.forEach(header => {
        const headerDiv = document.createElement('div');
        headerDiv.className = "grid-header";
        
        if (header === 'Price') {
            headerDiv.textContent = 'Price';

            const ascButton = document.createElement('button');
            ascButton.textContent = '▲';
            ascButton.style = "border: none; background: transparent; cursor: pointer;";
            ascButton.addEventListener('click', () => sortBooksByPrice('asc'));

            const descButton = document.createElement('button');
            descButton.textContent = '▼';
            descButton.style = "border: none; background: transparent; cursor: pointer;";
            descButton.addEventListener('click', () => sortBooksByPrice('desc'));

            headerDiv.appendChild(ascButton);
            headerDiv.appendChild(descButton);
        }

        else if (header === 'Title') {
            headerDiv.textContent = 'Title';

            const ascButton = document.createElement('button');
            ascButton.textContent = '▲';
            ascButton.style = "border: none; background: transparent; cursor: pointer;";
            ascButton.addEventListener('click', () => sortBooksByTitle('asc'));

            const descButton = document.createElement('button');
            descButton.textContent = '▼';
            descButton.style = "border: none; background: transparent; cursor: pointer;";
            descButton.addEventListener('click', () => sortBooksByTitle('desc'));

            headerDiv.appendChild(ascButton);
            headerDiv.appendChild(descButton);
        }

        else {
            headerDiv.textContent = header;
        }

        bookListDiv.appendChild(headerDiv);
    });

    booksData.books.forEach(book => {
        const idDiv = document.createElement('div');
        idDiv.className = "book-item";
        idDiv.textContent = book.id;

        const titleDiv = document.createElement('div');
        titleDiv.className = "book-item";
        titleDiv.textContent = book.title;

        const priceDiv = document.createElement('div');
        priceDiv.className = "book-item";
        priceDiv.textContent = book.price;

        const actionDiv = document.createElement('div');
        actionDiv.className = "book-item";

        const buttonRead = document.createElement('button');
        buttonRead.className = "book-btn";
        buttonRead.textContent = "Read";
        buttonRead.onclick = () => getBookById(book.id);

        const buttonUpdate = document.createElement('button');
        buttonUpdate.className = "book-btn update";
        buttonUpdate.textContent = "Update";
        buttonUpdate.onclick = () => showUpdateForm(book.id);

        const buttonDelete = document.createElement('button');
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


function getBookById(bookId){
    const booksData=getBooksFromStorage();
    const book=booksData.books.find(book=>book.id==bookId);
    if (book){ 
        localStorage.setItem('currentBook',JSON.stringify(book));
        bookDisaplay(book);
    }else {
        console.error("Book not found.");
    }
}

function deleteBook(bookId) {
    let booksData = getBooksFromStorage();
    booksData.books = booksData.books.filter(book => book.id !== bookId); // מעדכן את הרשימה בתוך booksData
    console.log(booksData);
    saveBooksToStorage(booksData); // שמירת המערך המעודכן
    localStorage.removeItem(`bookRating_${bookId}`); // מחיקת ה-Rate של הספר

    const storedBook = localStorage.getItem('currentBook');
    if (storedBook) {
        const currentBook = JSON.parse(storedBook);
        if (currentBook.id == bookId) {
            localStorage.removeItem('currentBook'); // מחיקת הספר הנוכחי אם הוא הספר שנמחק
            closeBook();
        }
    }

    console.log("Book deleted with id:", bookId);
    getList();
}

export function addBook(newBook) {
    let booksData = getBooksFromStorage();
    
    if (!booksData.books) {
        booksData.books = [];
    }
    
    booksData.books.push(newBook);
    saveBooksToStorage(booksData);
    console.log("Book added:", newBook);
}

export function updateBook(updatedBook) {
    let booksData = getBooksFromStorage();

    const index = booksData.books.findIndex(book => book.id === updatedBook.id);
    if (index !== -1) {
        booksData.books[index] = updatedBook;
        saveBooksToStorage(booksData);
        console.log("Book updated:", updatedBook);
    } else {
        console.error("Book not found:", updatedBook.id);
    }
}

getList();