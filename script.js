let title = document.querySelector("#book-title");
let author = document.querySelector("#book-author");
let pages = document.querySelector("#book-pages");
let read = document.querySelector("#book-read");

const submitBtn = document.querySelector("#submit-btn");
let bookList = document.querySelector("#book-list");

let tableBody = document.querySelector("#table-body");

let nextOrder = 0;
let sorting = document.querySelector("#sorting");

const myLibrary = [];

function Book(title, author, pageno, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageno = pageno;
    this.isRead = isRead;
    this.order = nextOrder++;
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
    if(String(title.value).length > 35) {
        alert("Sorry. Title length is too long!");
        return;
    }
    if(String(author.value).length > 35) {
        alert("Sorry. Author length is too long!");
        return;
    }
    if(Number(pages.value) > 99999) {
        alert("That's too much pages, can you tear up some?");
        return;
    }
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
        const tr = document.createElement("tr");
        tr.id = book.id;

        const titleTd = document.createElement("td");
        titleTd.textContent = book.title;

        const authorTd = document.createElement("td");
        authorTd.textContent = book.author;

        const pageTd = document.createElement("td");
        pageTd.textContent = book.pageno;

        const readTd = document.createElement("td");
        const readBtn = document.createElement("button");
        readBtn.className = `read-btn ${(book.isRead ? "read" : "not-read")}`
        readBtn.textContent = `${(book.isRead ? "Read" : "Not Read")}`;
        readTd.appendChild(readBtn);

        const deleteTd = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "DELETE";

        tr.append(titleTd,authorTd, pageTd, readTd, deleteTd);
        tableBody.prepend(tr);
    }
}

addBookToLibrary("Game of Thrones", "George R. R. Martin", 1016, true);
addBookToLibrary("Harry Potter", "J. K. Rowling", 607, false);

sorting.addEventListener("change", () => {
    if(sorting.value === "oldest") myLibrary.sort((a, b) => b.order - a.order);
    else if(sorting.value === "newest") myLibrary.sort((a, b) => a.order - b.order);
    else if(sorting.value === "pages-dec") myLibrary.sort((a, b) => a.pageno - b.pageno);
    else if(sorting.value === "pages-inc") myLibrary.sort((a, b) => b.pageno - a.pageno);
    else if(sorting.value === "read-stat") myLibrary.sort((a, b) => {
        if(a.isRead === true && b.isRead === false) return 1;
        if(a.isRead === false && b.isRead === true) return -1;
        return 0;
    });
    display();
})