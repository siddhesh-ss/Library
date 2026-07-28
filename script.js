let title = document.querySelector("#book-title");
let author = document.querySelector("#book-author");
let pages = document.querySelector("#book-pages");
let read = document.querySelector("#book-read");

const submitBtn = document.querySelector("#submit-btn");
let bookList = document.querySelector("#book-list");

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

function display() {
        let list = document.createElement("li");
        let bookTitle = document.createElement("p");
        bookTitle.textContent = myLibrary[myLibrary.length-1].title;
        let bookAuthor = document.createElement("p");
        bookAuthor.textContent = myLibrary[myLibrary.length-1].author;
        let bookPages = document.createElement("p");
        bookPages.textContent = myLibrary[myLibrary.length-1].pageno;
        let bookRead = document.createElement("p");
        bookRead.textContent = myLibrary[myLibrary.length-1].isRead;
        
        list.appendChild(bookTitle);
        list.appendChild(bookAuthor);
        list.appendChild(bookPages);
        list.appendChild(bookRead);
        
        bookList.appendChild(list);
}

submitBtn.addEventListener("click", (e) => {
    addBookToLibrary(title.value, author.value, pages.value, read.value);
    e.preventDefault();
});