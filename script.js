
const cardHolder = document.getElementById('card-holder')
const newBookBtn = document.getElementById('new-book')
const addBookForm = document.getElementById('add-book')
const newBookName = document.getElementById('book-name')
const nameError = document.getElementById('nameError')
newBookName.addEventListener('input', () => {
    if(newBookName.validity.valueMissing) {
        nameError.classList.add('active')
        nameError.textContent = 'Book name is required'
    } else if(newBookName.validity.valid) {
        nameError.classList.remove('active')
        nameError.textContent = ''
    }
})
const newBookAuthor = document.getElementById('book-author')
const authorError = document.getElementById('authorError')
newBookAuthor.addEventListener('input', () => {
    if(newBookAuthor.validity.valueMissing) {
        authorError.classList.add('active')
        authorError.textContent = 'Author name is required'
    } else if(newBookAuthor.validity.valid) {
        authorError.classList.remove('active')
        authorError.textContent = ''
    }
})
const newBookpages = document.getElementById('book-pages')
const newBookRead = document.getElementById('book-read')
const addBtn = document.getElementById('add')
const cancel = document.getElementById('cancel')
const sort = document.getElementById('sort')
const content = document.getElementById('content')

let optionState = sort.value

sort.addEventListener('change', (e) => {
    optionState = sort.value
    library.sort(optionState)
    loadLibrary()
})

cancel.addEventListener('click', () => {
    clearForm()
    addBookForm.style.display = 'none'
    content.classList.remove('blur')
})

addBookForm.addEventListener('submit', (event) => {

    if(!newBookName.validity.valid) {
        console.log("Name Required")
    }


    event.preventDefault()
    addBookToLibrary()
    clearForm()
})

function clearForm() {
    newBookName.value = ""
    newBookAuthor.value = ""
    newBookpages.value = ""
    newBookRead.checked = false
}

newBookBtn.addEventListener('click', () => {
    addBookForm.style.display = 'flex'
    content.classList.add('blur')
})

class Book {
    constructor(title = 'unknown', auhtor="unknown", pages=0, isRead=false){
        this.title = title;
        this.author = auhtor;
        this.pages = pages;
        this.isRead = isRead
    }

    toggleRead() {
        this.isRead = !this.isRead
    }
}

class Library {
    constructor() {
        this.books = []
    }

    addBook(newBook) {
        if(!this.isInLibrary(newBook)) {
            this.books.push(newBook)
        }
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
    }

    getBook(title) {
        return this.books.find((book) => book.title === title)
    }

    isInLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title)
    }

    bookCards() {
        for(let book of this.books) {
            cardHolder.appendChild(makeBookCard(book));
        }
    }

    sort(option) {
        switch(option) {
            case "1": 
                this.books.sort((a, b) => {
                    const aTitle = a.title.toUpperCase();
                    const bTitle = b.title.toUpperCase();
                    if(aTitle < bTitle) {
                        return -1;
                    }
                    if(aTitle > bTitle) {
                        return 1;
                    }
                    return 0;
                })
                break;
            case "2": 
                this.books.sort((a, b) => {
                    const aTitle = a.title.toUpperCase();
                    const bTitle = b.title.toUpperCase();
                    if(aTitle < bTitle) {
                        return 1;
                    }
                    if(aTitle > bTitle) {
                        return -1;
                    }
                    return 0;
                })
                break
            case "3":
                this.books.sort((a, b) => {
                    const aPages = a.pages;
                    const bPages = b.pages;
                    if(aPages < bPages) {
                        return -1;
                    }
                    if(aPages > bPages) {
                        return 1;
                    }
                    return 0;
                })
                break
            case "4":
                this.books.sort((a, b) => {
                    const aPages = a.pages;
                    const bPages = b.pages;
                    if(aPages < bPages) {
                        return 1;
                    }
                    if(aPages > bPages) {
                        return -1;
                    }
                    return 0;
                })
                break
            case "5":
                this.books.sort((a, b)=> {
                    const aRead = a.isRead;
                    const bRead = b.isRead;
                    if(aRead & !bRead) {
                        return -1;
                    }
                    if(bRead & !aRead) {
                        return 1;
                    }
                    return 0;
                })
        }
    }
}

const library = new Library()






function makeBookCard(Book) {
    const newCard = document.createElement('div')
    newCard.classList.add('card')

    const title = document.createElement('h2')
    title.classList.add('title')
    title.textContent = Book.title;
    newCard.appendChild(title)
    newCard.appendChild(document.createElement('hr'))

    const author = document.createElement('p')
    author.classList.add('author')
    author.textContent = Book.author
    newCard.appendChild(author)
    newCard.appendChild(document.createElement('hr'))

    const pages = document.createElement('p')
    pages.classList.add('pages')
    pages.textContent = `${Book.pages} pages`
    newCard.appendChild(pages)

    const readBtn = document.createElement('button')
    readBtn.classList.add('notRead')
    readBtn.classList.add('btn')
    if(Book.isRead) {
        readBtn.innerHTML = 'Read'
        readBtn.classList.add('read')
    }else {
        readBtn.innerHTML = 'Not Read'
    }
    readBtn.addEventListener('click', (e) => {
        Book.isRead ? e.target.innerHTML = 'Not Read' : e.target.innerHTML = 'Read'
        e.target.classList.toggle('read')
        Book.toggleRead()
    })
    newCard.appendChild(readBtn)

    const delBtn = document.createElement('button')
    delBtn.classList.add('del')
    delBtn.classList.add("btn")
    delBtn.innerHTML = 'Delete'
    delBtn.addEventListener('click', () => {
        library.removeBook(Book.title)
        loadLibrary()
    })
    newCard.appendChild(delBtn)

    return newCard
}

function clearCardHolder() {
    cardHolder.innerHTML = ''
}

function addBookToLibrary() {
    library.addBook(new Book(newBookName.value, newBookAuthor.value, newBookpages.value, newBookRead.checked))
    addBookForm.style.display = 'none'
    library.sort(optionState)
    content.classList.remove('blur')
    loadLibrary()
}


function loadLibrary() {
    clearCardHolder()
    library.bookCards()
}



window.addEventListener('load', loadLibrary())