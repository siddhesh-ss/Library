let title = document.querySelector("#book-title");
let author = document.querySelector("#book-author");
let pages = document.querySelector("#book-pages");
let read = document.querySelector("#book-read");

const submitBtn = document.querySelector("#submit-btn");
let bookList = document.querySelector("#book-list");

let tableBody = document.querySelector("#table-body");

const myLibrary = [];

function Book(title, author, pageno, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageno = pageno;
    this.isRead = isRead;
}

function addBookToLibrary(title, author, pageno, isRead) {
    myLibrary.push(new Book(title, author, pageno, isRead));
    display();
}

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if(title.value === "" || author.value === "" || pages.value === "") {
        alert("Please fill all inputs");
        return;
    };
    addBookToLibrary(title.value, author.value, pages.value, (read.value === 'read' ? true : false));
    clearForm();
});

tableBody.addEventListener("click", (e) => {
    let bookId = e.target.parentNode.parentNode.id;
    if(e.target.id === "delete-btn") deleteBook(bookId);
    else if(e.target.id === "read-btn") changeStatus(bookId);
});

function clearForm() {
    title.value = "";
    author.value = "";
    pages.value = "";
}

function deleteBook(bookId) {
    for(let i = 0 ; i < myLibrary.length ; i++) {
        if(bookId === myLibrary[i].id) {
            myLibrary.splice(i, 1);
            display();
        }
    }
}

function changeStatus(bookId) {
    for(let book of myLibrary) {
        if(book.id === bookId) {
            book.isRead = !book.isRead;
            display();
            return;
        }
    }
}

function display() {
    tableBody.innerHTML = "";
    for(const book of myLibrary) {
        let row = ` <tr id="${book.id}">
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.pageno}</td>
                    <td><button class="read-btn ${(book.isRead ? "read" : "not-read")}" id="read-btn">${(book.isRead ? "Read" : "Not Read")}</button></td>
                    <td><button class="delete-btn" id="delete-btn">DELETE</button></td>
                    </tr>`;
        tableBody.insertAdjacentHTML("afterbegin", row);
    }
}

addBookToLibrary("Game of Thrones", "George R. R. Martin", 1016, true);
addBookToLibrary("Harry Potter", "J. K. Rowling", 607, false);