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
