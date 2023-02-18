let library = []

var addingBook = false;

const newBookBtn = document.getElementById('new-book')
const addBookDiv = document.getElementById('add-book')
const bookName = document.getElementById('book-name')
const bookAuthor = document.getElementById('book-author')
const bookPages = document.getElementById('book-pages')
const bookRead = document.getElementById('book-read')
const addBtn = document.getElementById('add')
const cancelBtn = document.getElementById('cancel')
const cardHolder = document.getElementById('card-holder')
newBookBtn.addEventListener('click', displayBookDiv)


function Book(name, author, pages, haveRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

function displayBookDiv() {
    addBookDiv.style.display = 'flex'
    addBtn.addEventListener('click', addBookToLibrary)
    cancelBtn.addEventListener('click', () => {
        addBookDiv.style.display = 'none'
    })
}

function addBookToLibrary() {
    const newBook = new Book(bookName.value, bookAuthor.value, bookPages.value, bookRead.value)

    library.push(newBook);
    addBookDiv.style.display = "none";
    loadLibrary()
    console.log(library)
}


function loadLibrary() {
    if(library.length === 0) return;

    for (const book in library) {
        let newCard = document.createElement('div')
        newCard.classList.add('card')
        console.log(book)
        let title = document.createElement('h2')
        title.classList.add('title')
        title.textContent = book.name
        newCard.appendChild(title)

        let author = document.createElement('p')
        author.classList.add('author')
        author.textContent = book.author
        newCard.appendChild(author)

        let pages = document.createElement('p')
        pages.classList.add('pages')
        pages.textContent = `${book.pages} pages`
        newCard.appendChild(pages)

        cardHolder.appendChild(newCard)

    }
}
