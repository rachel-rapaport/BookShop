import data from './books.json' with {type: 'json'}
import { getList } from './bookCRUD.js';

function loadData(){
    saveBooksToStorage(data)
    //לבדוק למה לא עובד
    // getList();
    // closeBook();
}
window.loadData=loadData;

export function saveBooksToStorage(books) {
    localStorage.setItem('booksData', JSON.stringify(books));
    console.log("----------------------------")
}

export function getBooksFromStorage() {
    const savedData = localStorage.getItem('booksData');
    if (savedData) {
        return JSON.parse(savedData);
    } else {
        console.error("No data found in localStorage");
        return [];
    }
}

// function getList(){
//     const booksData=getBooksFromStorage();

//     let bookListDiv=document.querySelector(".bookList");
//     bookListDiv.innerHTML="";

//     const headers = ['Id', 'Title', 'Price', 'Action'];
//     headers.forEach(header => {
//         const headerDiv = document.createElement('div');
//         headerDiv.className = "grid-header"; 
//         headerDiv.textContent = header;
//         bookListDiv.appendChild(headerDiv); 
//     });

//     booksData.books.forEach(book => {
//         const idDiv = document.createElement('div');
//         idDiv.className="book-item";
//         idDiv.textContent=book.id;

//         const titleDiv = document.createElement('div');
//         titleDiv.className="book-item";
//         titleDiv.textContent=book.title;

//         const priceDiv = document.createElement('div');
//         priceDiv.className="book-item";
//         priceDiv.textContent=book.price;

//         const actionDiv = document.createElement('div');
//         actionDiv.className="book-item";

//         const buttonRead=document.createElement('button');
//         buttonRead.className="book-btn";
//         buttonRead.textContent="Read"
//         buttonRead.onclick=()=>readBook(book.id);        

//         const buttonUpdate = document.createElement('button');
//         buttonUpdate.className="book-btn update";
//         buttonUpdate.textContent="Update"

//         const buttonDelete = document.createElement('button');
//         buttonDelete.className="book-btn delete";
//         buttonDelete.textContent="Delete"
//         buttonDelete.onclick=()=>deleteBook(book.id);

//         actionDiv.appendChild(buttonRead)
//         actionDiv.appendChild(buttonUpdate)
//         actionDiv.appendChild(buttonDelete)

//         bookListDiv.appendChild(idDiv);
//         bookListDiv.appendChild(titleDiv);
//         bookListDiv.appendChild(priceDiv);
//         bookListDiv.appendChild(actionDiv);
//     });
// }
// getList();

// function getBookById(bookId){
//     const booksData=getBooksFromStorage();
//     const book=booksData.books.find(book=>book.id==bookId);
//     if (book){ 
//         localStorage.setItem('currentBook',JSON.stringify(book));
//         bookDisaplay(book);
//     }else {
//         console.error("Book not found.");
//     }
// }

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

function updateRate(bookId,value){
    const rateNumberDiv = document.querySelector(`.rate-number[data-book-id="${bookId}"]`);
    let currentRate=parseInt(rateNumberDiv.textContent);

    currentRate+=value;
    currentRate=Math.max(0,currentRate);

    localStorage.setItem(`bookRating_${bookId}`, currentRate);
    rateNumberDiv.textContent = currentRate;
}

window.onload = function() {
    const storedBook = localStorage.getItem('currentBook');

    if (storedBook) {
        const book = JSON.parse(storedBook); 
        bookDisaplay(book); 
    }
};

export function closeBook(){
    const readBookDiv=document.querySelector(".readBook");
    readBookDiv.classList.add('hidden'); 
}

// function addBook(newBook) {
//     const booksData=getBooksFromStorage();
//     books.push(newBook);
//     saveBooksToStorage(booksData); 
// }

// function deleteBook(bookId) {
//     let booksData = getBooksFromStorage();
//     booksData.books = booksData.books.filter(book => book.id !== bookId); // מעדכן את הרשימה בתוך booksData
//     saveBooksToStorage(booksData); // שמירת המערך המעודכן
//     localStorage.removeItem(`bookRating_${bookId}`); // מחיקת ה-Rate של הספר
//     console.log("Book deleted with id:", bookId);
//     getList();
//     const storedBook = localStorage.getItem('currentBook');
//     if(storedBook){
//         const currentBook = JSON.parse(storedBook);
//         if(currentBook.id==bookId){
//             closeBook();
//         }
//     }
// }


// function model(){
//     // document.getElementById('coverUrl').addEventListener('change', function(event) {
//     //     const file = event.target.files[0]; // קובץ התמונה שהמשתמש העלה
    
//     //     if (file) {
//     //         const reader = new FileReader();
            
//     //         reader.onload = function(e) {
//     //             const imgPreview = document.getElementById('coverPreview');
//     //             imgPreview.src = e.target.result; // הצגת התמונה שנקראה על ידי FileReader בתור Data URL
//     //             imgPreview.style.display = 'block'; // הצגת האלמנט של התמונה
//     //         }
    
//     //         reader.readAsDataURL(file); // קריאת הקובץ כתמונה בפורמט Data URL
//     //     }
//     // });
    
//     // document.getElementById('bookForm').addEventListener('submit', function(event) {
//     //     event.preventDefault();  // מניעת שליחה ברירת מחדל של הטופס
    
//     //     // יצירת אובייקט ספר מהטופס
//     //     const book = {
//     //         id: document.getElementById('id').value,
//     //         title: document.getElementById('title').value,
//     //         price: document.getElementById('price').value,
//     //         image: document.getElementById('coverPreview').src  // לוקח את התמונה מ-Data URL
//     //     };
    
//     //     // קבלת הספרים מה-localStorage
//     //     let books = getBooksFromStorage();
    
//     //     // הוספת הספר החדש לרשימת הספרים
//     //     books.books.push(book);
    
//     //     // שמירת הרשימה המעודכנת בחזרה ב-localStorage
//     //     localStorage.setItem('booksData', JSON.stringify(books));
    
//     //     // ניקוי הטופס
//     //     document.getElementById('bookForm').reset();
//     //     document.getElementById('coverPreview').style.display = 'none'; // הסתרת התמונה לאחר ההוספה
//     //     bookModal.style.display = 'none'; // סגירת ה-Modal
    
//     //     // עדכון רשימת הספרים המוצגת
//     //     getList();
//     // });
// }
// model()

export function sortBooksByPrice(order) {
    const booksData = getBooksFromStorage();

    if (order === 'asc') {
        booksData.books.sort((a, b) => a.price - b.price); // סדר עולה
    } else if (order === 'desc') {
        booksData.books.sort((a, b) => b.price - a.price); // סדר יורד
    }

    saveBooksToStorage(booksData);
    getList(); // הצגת הרשימה הממוינת מחדש
}


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


