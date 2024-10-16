import data from './books.json' with {type: 'json'}
import { getList } from './bookCRUD.js';

// Function to load initial data from the JSON file and save it to local storage
function loadData(){
    saveBooksToStorage(data)
    getList();
    closeBook();
}
window.loadData=loadData;

// Function to save books data to local storage
export function saveBooksToStorage(books) {
    localStorage.setItem('booksData', JSON.stringify(books));
}

// Function to retrieve books data from local storage
export function getBooksFromStorage() {
    const savedData = localStorage.getItem('booksData');

    if (savedData) {
        return JSON.parse(savedData);
    } else {
        console.error("No data found in localStorage");
        return [];
    }
}

// Function to display book details in the 'readBook' section
export function bookDisaplay(book){
    const bookTitleElement = document.querySelector(".book-title");
    const bookPriceElement = document.querySelector(".price");
    const bookImageElement = document.querySelector(".book-image");
    const bookRateElement = document.querySelector(".rate");
    const readBookDiv=document.querySelector(".readBook");
    const buttonCloseDiv=document.querySelector(".buttonClose");

    bookRateElement.textContent="rate:";
    const buttonSub=document.createElement('button');
    buttonSub.textContent="-";
    buttonSub.onclick=()=>updateRate(book.id,-1);
    const rateNumDiv=document.createElement('div');
    rateNumDiv.className='rate-number';
    rateNumDiv.setAttribute('data-book-id', book.id);
    const storedRating = localStorage.getItem(`bookRating_${book.id}`);
    rateNumDiv.textContent = storedRating ? storedRating : '0';
    const buttonAdd=document.createElement('button');
    buttonAdd.textContent="+";
    buttonAdd.onclick=()=>updateRate(book.id,1);

    bookRateElement.appendChild(buttonSub);
    bookRateElement.appendChild(rateNumDiv);
    bookRateElement.appendChild(buttonAdd);

    bookImageElement.innerHTML = ''; 
    const bookImage=document.createElement('img');
    bookImage.src = book.image; 
    bookImage.alt = book.title;
    bookImageElement.appendChild(bookImage)

    bookTitleElement.textContent=book.title;
    bookPriceElement.textContent=`Price: ${book.price}`

    buttonCloseDiv.innerHTML="";
    readBookDiv.classList.remove('hidden');
    const buttonClose=document.createElement('button');
    buttonClose.textContent="buttonClose";
    buttonClose.onclick=()=>closeBook();
    buttonCloseDiv.appendChild(buttonClose)
}

// Function to update the rating of a book
function updateRate(bookId,value){
    const rateNumberDiv = document.querySelector(`.rate-number[data-book-id="${bookId}"]`);
    let currentRate=parseInt(rateNumberDiv.textContent);

    currentRate+=value;
    currentRate=Math.max(0,currentRate);

    localStorage.setItem(`bookRating_${bookId}`, currentRate);
    rateNumberDiv.textContent = currentRate;
}

// Function to display the book details on page load if a book is stored in local storage
window.onload = function() {
    const storedBook = localStorage.getItem('currentBook');

    if (storedBook) {
        const book = JSON.parse(storedBook); 
        bookDisaplay(book); 
    }
};

// Function to close the book details section
export function closeBook(){
    const readBookDiv=document.querySelector(".readBook");
    readBookDiv.classList.add('hidden'); 
}

// Function to sort books by price in ascending or descending order
export function sortBooksByPrice(order) {
    const booksData = getBooksFromStorage();

    if (order === 'asc') {
        booksData.books.sort((a, b) => a.price - b.price); 
    } else if (order === 'desc') {
        booksData.books.sort((a, b) => b.price - a.price); 
    }

    saveBooksToStorage(booksData);
    getList(); 
}

// Function to sort books by title in alphabetical or reverse order
export function sortBooksByTitle(order) {
    let booksData = getBooksFromStorage();

    booksData.books.sort((a, b) => {
        if (order === 'asc') {
            return a.title.localeCompare(b.title);
        } else {
            return b.title.localeCompare(a.title);
        }
    });

    saveBooksToStorage(booksData);
    getList();
}


