import data from './books.json' with {type: 'json'}
console.log(data);

function getList(){
    let bookListDiv=document.querySelector(".bookList");
    data.books.forEach(book => {
        const idDiv = document.createElement('div');
        idDiv.className="book-item";
        idDiv.textContent=book.id;

        const titleDiv = document.createElement('div');
        titleDiv.className="book-item";
        titleDiv.textContent=book.title;

        const priceDiv = document.createElement('div');
        priceDiv.className="book-item";
        priceDiv.textContent=book.price;

        const actionDiv = document.createElement('div');
        actionDiv.className="book-item";

        const buttonRead=document.createElement('button');
        buttonRead.className="book-btn";
        buttonRead.textContent="Read"
        buttonRead.onclick=()=>readBook(book.id);        

        const buttonUpdate = document.createElement('button');
        buttonUpdate.className="book-btn update";
        buttonUpdate.textContent="Update"

        const buttonDelete = document.createElement('button');
        buttonDelete.className="book-btn delete";
        buttonDelete.textContent="Delete"

        actionDiv.appendChild(buttonRead)
        actionDiv.appendChild(buttonUpdate)
        actionDiv.appendChild(buttonDelete)

        bookListDiv.appendChild(idDiv);
        bookListDiv.appendChild(titleDiv);
        bookListDiv.appendChild(priceDiv);
        bookListDiv.appendChild(actionDiv);
    });
}
getList();

function readBook(bookId){
    const book=data.books.find(book=>book.id==bookId);
    localStorage.setItem('currentBook',JSON.stringify(book));
    
    bookDisaplay(book);
}

function bookDisaplay(book){
    const bookTitleElement = document.querySelector(".book-title");
    const bookPriceElement = document.querySelector(".price");
    const bookImageElement = document.querySelector(".book-image");
    const bookRateElement = document.querySelector(".rate");

    bookRateElement.textContent="";
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