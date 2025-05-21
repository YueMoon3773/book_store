// GET WEB ELEMENTS
// FILTER / ADD BOOK ELEMENTS
const addNewBookBtn = document.querySelector('.add_book_btn');

const filterInp = document.querySelector('.filter');

const orderInp = document.querySelector('#order_inp');
const orderLabel = document.querySelector('.order_label');
const orderIcon = document.querySelector('.order_icon');

const libraryDisplay = document.querySelector('.library');

// MODAL FORM ELEMENTS
const modalWrapper = document.querySelector('.modal_wrapper');
const modalForm = document.querySelector('.modal_form');
const formBasicInfo = document.querySelector('.basic_info');
const formCloseBtn = document.querySelector('.form_close_btn_wrapper');
const formFormBookImgInp = document.querySelector('#form_book_img_inp');
const formBookImg = document.querySelector('.display_book_img');

// MODAL FORM INPS
const formTitleInp = document.querySelector('#form_book_title_inp');
const formAuthorInp = document.querySelector('#form_book_author_inp');
const formPagesInp = document.querySelector('#form_book_pages_inp');

const formYearInp = document.querySelector('#form_book_year_inp');
const formEditionInp = document.querySelector('#form_book_edition_inp');
const formLanguageInp = document.querySelector('#form_book_language_inp');

const formReadInp = document.querySelector('.form_book_read_icon');
const formFavInp = document.querySelector('.form_book_favorite_icon');

const formTitle = document.querySelector('.form_title');
const formSubmitBtn = document.querySelector('.form_submit_btn');

// BOOK CARD ELEMENTS
let bookCardList;

// VARIABLES DEF
let isModalHide = true;
let modalFormImgSrc = '';
let isFormRead = false;
let isFormFav = false;

let renderType = '';
let renderSampleLib = false;

let isCardRead;
let isCardFav;

let isBookEdit = false;

let filterType = '';
let isOderDisabled = true;
let orderWay = 'up';

const sampleLibrary = [
    {
        title: 'The Red Pyramid',
        author: 'Rick Riordan',
        pages: 544,
        favStatus: true,
        readStatus: true,
    },
    {
        title: 'The Throne of Fire',
        author: 'Rick Riordan',
        pages: 464,
        favStatus: true,
        readStatus: true,
    },
    {
        title: "The Serpent's Shadow",
        author: 'Rick Riordan',
        pages: 416,
        favStatus: true,
        readStatus: true,
    },
    {
        title: 'Moby Dick',
        author: 'Herman Melville',
        pages: 635,
        favStatus: false,
        readStatus: false,
    },
    {
        title: 'The Fellowship of the Ring',
        author: 'J.R.R Tolkien',
        pages: 432,
        favStatus: true,
        readStatus: true,
    },
    {
        title: 'The Two Towers',
        author: 'J.R.R Tolkien',
        pages: 352,
        favStatus: true,
        readStatus: true,
    },
    {
        title: 'The Return of the King',
        author: 'J.R.R Tolkien',
        pages: 624,
        favStatus: true,
        readStatus: true,
    },
    {
        title: 'Little Women',
        author: 'Louisa May Alcott',
        pages: 759,
        favStatus: false,
        readStatus: false,
    },
    {
        title: 'The Fault in Our Stars',
        author: 'John Green',
        pages: 313,
        favStatus: true,
        readStatus: true,
    },
    {
        title: 'The Hunger Games',
        author: 'Suzanne Collins',
        pages: 374,
        favStatus: false,
        readStatus: true,
    },
    {
        title: 'Catching Fire',
        author: 'Suzanne Collins',
        pages: 391,
        favStatus: false,
        readStatus: true,
    },
    {
        title: 'Mockingjay',
        author: 'Suzanne Collins',
        pages: 400,
        favStatus: false,
        readStatus: true,
    },
    {
        title: 'The Shape of Water',
        author: 'Daniel Kraus and Guillermo del Toro',
        pages: 320,
        favStatus: true,
        readStatus: true,
    },
    {
        title: 'Me Before You',
        author: 'Jojo Moyes',
        pages: 416,
        favStatus: false,
        readStatus: false,
    },
];

const bookCardTemplate = (id, title, author, pages, favStatus, readStatus, imgSrc) => {
    let ret = `
                    <div class="book_card" data-id="${id}">
                        <div class="book_cover_img_wrapper">
                            <img
                                src="${imgSrc}"
                                alt="Book cover image"
                                class="book_img"
                            />
                        </div>

                        <div class="book_info">
                            <h1 class="book_title">${title}</h1>
                            <span class="book_author_wrapper">
                                By
                                <a href="javascript:void(0)" class="book_author">
                                    <em>${author}</em>
                                </a>
                            </span>
                            <span class="book_pages_wrapper">
                                <em class="book_pages">${pages}</em>
                                pages
                            </span>
                        </div>

                        <div class="book_controller">
                            <div class="book_left_controller">
                                <svg
                                    class="book_controller_btn book_edit_btn"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <title>Edit this book</title>
                                    <path
                                        d="M6 20H11V22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H18C19.11 2 20 2.9 20 4V10.3C19.78 10.42 19.57 10.56 19.39 10.74L18 12.13V4H13V12L10.5 9.75L8 12V4H6V20M22.85 13.47L21.53 12.15C21.33 11.95 21 11.95 20.81 12.15L19.83 13.13L21.87 15.17L22.85 14.19C23.05 14 23.05 13.67 22.85 13.47M13 19.96V22H15.04L21.17 15.88L19.13 13.83L13 19.96Z"
                                    />
                                </svg>

                                <svg
                                    class="book_controller_btn book_favorite_btn ${favStatus}"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <title>Favorite status</title>
                                    <path
                                        d="M19 23.3L18.4 22.8C16.4 20.9 15 19.7 15 18.2C15 17 16 16 17.2 16C17.9 16 18.6 16.3 19 16.8C19.4 16.3 20.1 16 20.8 16C22 16 23 16.9 23 18.2C23 19.7 21.6 20.9 19.6 22.8L19 23.3M18 2C19.1 2 20 2.9 20 4V13.08L19 13L18 13.08V4H13V12L10.5 9.75L8 12V4H6V20H13.08C13.2 20.72 13.45 21.39 13.8 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H18Z"
                                    />
                                </svg>

                                <svg
                                    class="book_controller_btn book_read_btn ${readStatus}"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <title>Read status</title>
                                    <path
                                        d="M16.75 22.16L14 19.16L15.16 18L16.75 19.59L20.34 16L21.5 17.41L16.75 22.16M18 2C19.1 2 20 2.9 20 4V13.34C19.37 13.12 18.7 13 18 13V4H13V12L10.5 9.75L8 12V4H6V20H12.08C12.2 20.72 12.45 21.39 12.8 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H18Z"
                                    />
                                </svg>
                            </div>
                            <div class="book_right_controller">
                                <svg
                                    class="book_controller_btn book_delete_btn"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <title>Delete this book</title>
                                    <path
                                        d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
    `;

    // return DOMPurify.sanitize(ret);
    return ret;
};

const myLibrary = [];

// function Book(sampleLib, id, title, author, pages, favStatus, readStatus, imgSrc, year, edition, language) {
//     if (!new.target) {
//         throw Error("You must use 'new' operator to call this constructor.");
//     }
//     this.id = id;
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.favStatus = favStatus;
//     this.readStatus = readStatus;

//     if (sampleLib) {
//         this.imgSrc = `./assets/img/booksCover/${this.title.split(' ').join('')}.jpg`;
//     } else {
//         if (imgSrc === '') {
//             this.imgSrc = './assets/img/noImg.png';
//         } else {
//             this.imgSrc = imgSrc;
//         }
//     }
//     this.year = year;
//     this.edition = edition;
//     this.language = language;

//     this.info = function () {
//         let read_status = '';
//         this.readStatus === false ? (read_status = 'not read yet') : (read_status = 'you read this book');

//         let ret = `${this.title} by ${this.author}, ${this.pages}, ${read_status}.`;
//         return ret;
//     };
// }

const Book = class {
    constructor(sampleLib, id, title, author, pages, favStatus, readStatus, imgSrc, year, edition, language) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.favStatus = favStatus;
        this.readStatus = readStatus;

        if (sampleLib) {
            this.imgSrc = `./assets/img/booksCover/${this.title.split(' ').join('')}.jpg`;
        } else {
            if (imgSrc === '') {
                this.imgSrc = './assets/img/noImg.png';
            } else {
                this.imgSrc = imgSrc;
            }
        }
        this.year = year;
        this.edition = edition;
        this.language = language;
    }

    info() {
        let read_status = '';
        this.readStatus === false ? (read_status = 'not read yet') : (read_status = 'you read this book');
        let ret = `${this.title} by ${this.author}, ${this.pages}, ${read_status}.`;
        return ret;
    }
};

// ===========================================================================================
//FOR WEB APPEARANCE FUNCTIONAL + STYLES
// ===========================================================================================

// MODAL FORM STYLES FUNCS
// reset all values of the modal form inps and reset fav/read style
// delete hidden inps if any
// if in BookEdit state => reset isBookEdit state + change Form title and submit btn context as initial
const resetFormInputs = () => {
    formTitleInp.value = '';
    formAuthorInp.value = '';
    formPagesInp.value = '';
    if (isFormFav) {
        isFormFav = false;
        formFavInp.classList.remove('active');
    }
    if (isFormRead) {
        isFormRead = false;
        formReadInp.classList.remove('active');
    }
    if (modalFormImgSrc !== '') {
        modalFormImgSrc = '';
        formBookImg.src = './assets/img/noImg.png';
    }
    formYearInp.value = '';
    formEditionInp.value = '';
    formLanguageInp.value = '';

    // Check if there are hidden form Id inp and Index inp
    // These inps are used for editing book information
    // if yes delete them from DOM
    const hiddenInpId = document.querySelector('.basic_info .hiddenInpId');
    if (hiddenInpId) {
        formBasicInfo.removeChild(hiddenInpId);
    }
    const hiddenInpIndex = document.querySelector('.basic_info .hiddenInpIndex');
    if (hiddenInpIndex) {
        formBasicInfo.removeChild(hiddenInpIndex);
    }

    // Check if isBookEdit state true
    // if yes reset it + Change Form title and submit btn context as initial
    if (isBookEdit === true) {
        isBookEdit = false;

        // Change Form title and Submit btn text context
        formTitle.innerText = "Add your book's information";
        formSubmitBtn.innerText = 'Add book to shelf';
    }
};

// Unhide / Open Modal form based on addNewBookBtn click
let unhideModalWrapper = () => {
    let modalWrapperClass = Array.from(modalWrapper.classList);

    // check if modal is hide by check if it includes 'hide'
    if (modalWrapperClass.includes('hide')) {
        isModalHide = true;
    } else {
        isModalHide = false;
    }

    if (isModalHide) {
        modalWrapper.classList.remove('hide');
    }
};
addNewBookBtn.addEventListener('click', unhideModalWrapper);

// hide / close Modal form based on close modal btn
let hideModalWrapper = () => {
    let modalWrapperClass = Array.from(modalWrapper.classList);

    // check if modal is hide by check if it includes 'hide'
    if (modalWrapperClass.includes('hide')) {
        isModalHide = true;
    } else {
        isModalHide = false;
    }

    resetFormInputs();
    if (!isModalHide) {
        modalWrapper.classList.add('hide');
    }
};
formCloseBtn.addEventListener('click', hideModalWrapper);

// modal display image user uploaded and store to modalFormImgSrc variable
formFormBookImgInp.addEventListener('change', (e) => {
    if (e.target.files.length) {
        modalFormImgSrc = URL.createObjectURL(e.target.files[0]);
        // console.log(modalFormImgSrc);
        formBookImg.src = modalFormImgSrc;
    }
});

//Toggle form read and fav + set up read + fav favStatus
formReadInp.addEventListener('click', () => {
    // check if the btn includes active state
    if (Array.from(formReadInp.classList).includes('active')) {
        formReadInp.classList.remove('active');
        isFormRead = false;
    } else {
        formReadInp.classList.add('active');
        isFormRead = true;
    }
    // console.log('read: ', isFormRead);
});

formFavInp.addEventListener('click', () => {
    // check if the btn includes active state
    if (Array.from(formFavInp.classList).includes('active')) {
        formFavInp.classList.remove('active');
        isFormFav = false;
    } else {
        formFavInp.classList.add('active');
        isFormFav = true;
    }
    // console.log('fav: ', isFormFav);
});

// ===========================================================================================
// LOGICAL FUNCS FOR ADD / RENDER /HANDLE BOOK CARD
// ===========================================================================================

// Use in Edit book state
// update new info to myLibrary arr based on the provide index
const updateBookInfoToMyLibrary = (
    indexInMyLibrary,
    title,
    author,
    pages,
    favStatus,
    readStatus,
    imgSrc,
    year,
    edition,
    language,
) => {
    // update input props to myLibrary arr
    myLibrary[indexInMyLibrary].title = title;
    myLibrary[indexInMyLibrary].author = author;
    myLibrary[indexInMyLibrary].pages = pages;
    myLibrary[indexInMyLibrary].favStatus = favStatus;
    myLibrary[indexInMyLibrary].readStatus = readStatus;
    myLibrary[indexInMyLibrary].imgSrc = imgSrc;
    myLibrary[indexInMyLibrary].year = year;
    myLibrary[indexInMyLibrary].edition = edition;
    myLibrary[indexInMyLibrary].language = language;
};

// Update modal form to edit book form
// Update form inps to the info of one in myLibrary arr
const handleEditBookForm = (indexInMyLibrary, bookWithIdInMyLibrary) => {
    resetFormInputs();
    unhideModalWrapper();

    // Change Form title and Submit btn text context
    formTitle.innerText = "Update your book's information";
    formSubmitBtn.innerText = 'Save changes';

    // change form edit state
    isBookEdit = true;

    // Update form inps based on the bookWithIdInMyLibrary from myLibrary arr
    formTitleInp.value = bookWithIdInMyLibrary.title;
    formAuthorInp.value = bookWithIdInMyLibrary.author;
    formPagesInp.value = bookWithIdInMyLibrary.pages;

    if (bookWithIdInMyLibrary.year === undefined) {
        formYearInp.value = '';
    } else {
        formYearInp.value = bookWithIdInMyLibrary.year;
    }

    if (bookWithIdInMyLibrary.edition === undefined) {
        formEditionInp.value = '';
    } else {
        formEditionInp.value = bookWithIdInMyLibrary.edition;
    }

    if (bookWithIdInMyLibrary.language === undefined) {
        formLanguageInp.value = '';
    } else {
        formLanguageInp.value = bookWithIdInMyLibrary.language;
    }

    if (bookWithIdInMyLibrary.favStatus === true) {
        isFormFav = true;
        formFavInp.classList.add('active');
    } else {
        isFormFav = false;
        formFavInp.classList.remove('active');
    }

    if (bookWithIdInMyLibrary.readStatus === true) {
        isFormRead = true;
        formReadInp.classList.add('active');
    } else {
        isFormRead = false;
        formReadInp.classList.remove('active');
    }

    if (bookWithIdInMyLibrary.imgSrc === './assets/img/noImg.png') {
        modalFormImgSrc = './assets/img/noImg.png';
        formBookImg.src = './assets/img/noImg.png';
    } else {
        modalFormImgSrc = bookWithIdInMyLibrary.imgSrc;
        formBookImg.src = bookWithIdInMyLibrary.imgSrc;
    }

    // Create hidden inputs to store Book need to be edited ID and its index in myLibrary arr
    const hiddenInpId = document.createElement('input');
    hiddenInpId.type = 'hidden';
    hiddenInpId.className = 'hiddenInpId';
    hiddenInpId.name = 'hiddenInpId';
    hiddenInpId.value = bookWithIdInMyLibrary.id;
    formBasicInfo.appendChild(hiddenInpId);

    const hiddenInpIndex = document.createElement('input');
    hiddenInpIndex.type = 'hidden';
    hiddenInpIndex.className = 'hiddenInpIndex';
    hiddenInpIndex.name = 'hiddenInpIndex';
    hiddenInpIndex.value = indexInMyLibrary;
    formBasicInfo.appendChild(hiddenInpIndex);
};

const handleBookCard = (bookCardList) => {
    bookCardList.forEach((bookCard) => {
        // Create variables for buttons WITHIN this specific bookCard
        // => Create all vars for the elements in each bookCard
        const bookCardId = bookCard.dataset.id;
        const bookCardEditBtn = bookCard.querySelector('.book_edit_btn');
        const bookCardFavoriteBtn = bookCard.querySelector('.book_favorite_btn');
        const bookCardReadBtn = bookCard.querySelector('.book_read_btn');
        const bookCardDeleteBtn = bookCard.querySelector('.book_delete_btn');

        let indexInMyLibrary;
        let bookWithIdInMyLibrary = myLibrary.find((book, index) => {
            indexInMyLibrary = index;
            return book.id === bookCardId;
        });

        // bookCard.addEventListener('click', () => {
        //     // console.log(bookCardId);
        //     // console.log('book card click index: ', indexInMyLibrary);
        //     // console.log('book card click: ', bookWithIdInMyLibrary);
        // });

        // listen to favorite button
        bookCardFavoriteBtn.addEventListener('click', (e) => {
            // Prevent the event from bubbling up to the bookCard
            e.stopPropagation();

            // check if the btn includes active state
            // if yes remove it, otherwise add it
            if (Array.from(bookCardFavoriteBtn.classList).includes('active')) {
                bookCardFavoriteBtn.classList.remove('active');
                bookWithIdInMyLibrary.favStatus = false;
                isCardFav = false;
            } else {
                bookCardFavoriteBtn.classList.add('active');
                bookWithIdInMyLibrary.favStatus = true;
                isCardFav = true;
            }
            // console.log('fav btn: ', myLibrary);
        });

        // listen to read button
        bookCardReadBtn.addEventListener('click', (e) => {
            // Prevent the event from bubbling up to the bookCard
            e.stopPropagation();

            // check if the btn includes active state
            // if yes remove it, otherwise add it
            if (Array.from(bookCardReadBtn.classList).includes('active')) {
                bookCardReadBtn.classList.remove('active');
                bookWithIdInMyLibrary.readStatus = false;
                isCardRead = false;
            } else {
                bookCardReadBtn.classList.add('active');
                bookWithIdInMyLibrary.readStatus = true;
                isCardRead = true;
            }
            // console.log('read btn: ', myLibrary);
        });

        // listen to delete btn
        // remove that DOM element from DOM
        // remove the element with indexInMyLibrary from myLibrary arr
        bookCardDeleteBtn.addEventListener('click', (e) => {
            // Prevent the event from bubbling up to the bookCard
            e.stopPropagation();

            // display delete confirmation
            if (
                confirm(
                    `Do you want to delete "${bookWithIdInMyLibrary.title}" by "${bookWithIdInMyLibrary.author}" from library?`,
                )
            ) {
                myLibrary.splice(indexInMyLibrary, 1);
                bookCardList = '';
                renderType === 'renderAll';
                renderLibrary(renderType);
                // console.log('del btn: ', myLibrary);
            }
        });

        // listen to edit btn
        bookCardEditBtn.addEventListener('click', (e) => {
            // Prevent the event from bubbling up to the bookCard
            e.stopPropagation();

            handleEditBookForm(indexInMyLibrary, bookWithIdInMyLibrary);
        });
    });
};

// add books to myLibrary arr
// if the arr is empty, add sample book
// otherwise add custom book info to arr
const addBookToLibrary = (sampleLib, title, author, pages, favStatus, readStatus, imgSrc, year, edition, language) => {
    let bookToAdd;
    //if the arr is empty add sample to arr
    if (sampleLib) {
        sampleLibrary.forEach((book) => {
            bookToAdd = new Book(
                sampleLib,
                crypto.randomUUID(),
                book.title,
                book.author,
                book.pages,
                book.favStatus,
                book.readStatus,
            );

            myLibrary.push(bookToAdd);
        });
    }
    //else add the custom new element to arr with the input props
    else {
        bookToAdd = new Book(
            sampleLib,
            crypto.randomUUID(),
            title,
            author,
            pages,
            favStatus,
            readStatus,
            imgSrc,
            year,
            edition,
            language,
        );
        myLibrary.push(bookToAdd);
    }

    // console.log(myLibrary);
    // console.log(myLibrary.at(-1));
    return myLibrary;
};

// render library based on myLibrary arr props or added info
// render through html template
// add to htlm through libraryDisplay.insertAdjacentHTML
const renderLibrary = (renderType) => {
    let bookToRender, bookCard;
    let favActive, readActive;
    // if the renderType is sampleLib or All
    // clear all libraryDisplay child and render all elements of myLibrary;
    if (renderType === 'renderSampleLib' || renderType === 'renderAll') {
        libraryDisplay.innerHTML = '';
        myLibrary.forEach((book) => {
            bookToRender = book;
            if (bookToRender.favStatus === true) {
                favActive = 'active';
            } else {
                favActive = '';
            }
            if (bookToRender.readStatus === true) {
                readActive = 'active';
            } else {
                readActive = '';
            }

            bookCard = bookCardTemplate(
                bookToRender.id,
                bookToRender.title,
                bookToRender.author,
                bookToRender.pages,
                favActive,
                readActive,
                bookToRender.imgSrc,
            );
            libraryDisplay.insertAdjacentHTML('beforeend', bookCard);
        });
    }
    // otherwise render by input props from the render func
    else if (renderType === 'renderAddedBook') {
        bookToRender = myLibrary.at(-1);

        if (bookToRender.favStatus === true) {
            favActive = 'active';
        } else {
            favActive = '';
        }
        if (bookToRender.readStatus === true) {
            readActive = 'active';
        } else {
            readActive = '';
        }

        bookCard = bookCardTemplate(
            bookToRender.id,
            bookToRender.title,
            bookToRender.author,
            bookToRender.pages,
            favActive,
            readActive,
            bookToRender.imgSrc,
        );
        libraryDisplay.insertAdjacentHTML('beforeend', bookCard);
    }
    // create bookCardList from the newly create cards
    bookCardList = Array.from(document.querySelectorAll('.book_card'));
    handleBookCard(bookCardList);
};

// render sample lib if there is no book in the myLibrary
const initializeLibrary = () => {
    if (myLibrary.length === 0) {
        renderType = 'renderSampleLib';
        renderSampleLib = true;
        addBookToLibrary(renderSampleLib);
        renderLibrary(renderType);
    }
    console.log('Init Lib: ', myLibrary);
};
initializeLibrary();

// take all values of the modal form inps
// validate them
// if not in isEditBook state add them to myLibrary arr by addBookToLibrary
// render the newly added book by renderAddedBook
// this function works by click the submit btn in the form
const sendBookInfo = (isBookEdit) => {
    let title, author, pages, favStatus, readStatus, imgSrc, year, edition, language;
    let validateStatus = false;

    title = formTitleInp.value;
    author = formAuthorInp.value;
    pages = formPagesInp.value;
    favStatus = isFormFav;
    readStatus = isFormRead;
    imgSrc = modalFormImgSrc;
    year = formYearInp.value;
    edition = formEditionInp.value;
    language = formLanguageInp.value;

    // validate inputs value
    if (title === '') {
        validateStatus = false;
        formTitleInp.classList.add('invalid');
        alert('Title should be filled out. Please check again.');
    } else if (author === '') {
        validateStatus = false;
        formAuthorInp.classList.add('invalid');
        alert('Author should be filled out. Please check again.');
    } else if (pages === '') {
        validateStatus = false;
        formPagesInp.classList.add('invalid');
        alert('Pages should be filled out. Please check again.');
    } else if (Number.isInteger(Number(pages)) === false || Number.isInteger(Number(year)) === false) {
        validateStatus = false;
        alert('Pages and year must be digits. Please check again.');
    } else if (Number.isInteger(Number(pages)) === true) {
        validateStatus = true;
    }

    if (isBookEdit === true) {
        isBookEdit = false;
        validateStatus = false;

        // Take hidden inputs to store Book need to be edited ID and its index in myLibrary arr
        const hiddenInpId = document.querySelector('.basic_info .hiddenInpId').value;
        const hiddenInpIndex = Number(document.querySelector('.basic_info .hiddenInpIndex').value);
        // console.log('hiddenInpId: ', hiddenInpId);
        // console.log('hiddenInpIndex: ', hiddenInpIndex);

        let validateIndex;
        myLibrary.find((book, index) => {
            if (book.id === hiddenInpId) {
                validateIndex = index;
            }
        });
        // console.log('validateIndex: ', validateIndex);

        if (validateIndex === hiddenInpIndex) {
            validateStatus = true;
        }

        if (validateStatus === true) {
            renderType = 'renderAll';
            updateBookInfoToMyLibrary(
                hiddenInpIndex,
                title,
                author,
                pages,
                favStatus,
                readStatus,
                imgSrc,
                year,
                edition,
                language,
            );
            renderLibrary(renderType);
            // hide + reset + del form's hidden ipns
            hideModalWrapper();
        } else {
            alert('Cannot update book information. Please check your book input and try again.');
        }
    }
    // if not in edit Book state => Add new book to myLibrary arr
    else if (isBookEdit === false) {
        if (validateStatus) {
            renderType = 'renderAddedBook';
            renderSampleLib = false;
            addBookToLibrary(
                renderSampleLib,
                title,
                author,
                pages,
                favStatus,
                readStatus,
                imgSrc,
                year,
                edition,
                language,
            );
            renderLibrary(renderType);
            hideModalWrapper();
        } else {
            alert('Cannot add book to shelf. Please check your book input info again.');
        }
    }
    // console.log(myLibrary);
};
formSubmitBtn.addEventListener('click', () => {
    sendBookInfo(isBookEdit);
});

// prevent the form from sending data to database after submit
// this database will be implement in the future
const handleForm = (event) => {
    event.preventDefault();
};
modalForm.addEventListener('submit', handleForm);

// ===========================================================================================
// LOGICAL + STYLES FUNCS FOR FILTER AND ORDER BOOK LIST
// ===========================================================================================

// Sort the myLibrary arr based on filterType and orderWay
const sortLibrary = (filterType, orderWay) => {
    // if orderWay is 'up' sort a => z
    if (orderWay === 'up') {
        myLibrary.sort((a, b) => {
            if (a[filterType] > b[filterType]) return 1;
            else if (a[filterType] < b[filterType]) return -1;
            else return 0;
        });
    }
    // otherwise sort z => a
    else if (orderWay === 'down') {
        myLibrary.sort((a, b) => {
            if (a[filterType] > b[filterType]) return -1;
            else if (a[filterType] < b[filterType]) return 1;
            else return 0;
        });
    }
    // console.log('Sorted Lib: ', myLibrary);
};

// Listen to the filterInp to
// change the filterType accordingly filter selection index
filterInp.addEventListener('change', () => {
    let filterValue = filterInp.value;
    let filterIndex = filterInp.selectedIndex;

    // remove "disable" behavior of orderLabel if
    // there is book and filter slection != default
    if (myLibrary.length > 0 && filterIndex > 0) {
        orderLabel.classList.remove('disable');
    } else {
        orderLabel.classList.add('disable');
    }

    switch (filterIndex) {
        case 0:
            filterType = '';
            break;
        case 1:
        case 2:
        case 3:
        case 6:
            filterType = filterValue;
            break;
        case 4:
            filterType = 'readStatus';
            break;
        case 5:
            filterType = 'favStatus';
            break;
        default:
            filterType = '';
            alert('Cannot filter this selection. Please try again later.');
            break;
    }
    // console.log(filterType);

    // sort myLibrary arr and render them
    sortLibrary(filterType, orderWay);
    renderType = 'renderAll';
    renderLibrary(renderType);
});

// Change order label text and arrow based on click
// set up orderWay then sort myLibrary
// render library
orderLabel.addEventListener('click', (e) => {
    // check if the order input is checked or not
    let isOrderInpChecked = orderInp.checked;

    // Change the text value (thefirst node) of the label
    if (isOrderInpChecked) {
        orderLabel.firstChild.nodeValue = 'Descending';
        orderIcon.classList.add('down');
        orderWay = 'down';
    } else {
        orderLabel.firstChild.nodeValue = 'Ascending';
        orderIcon.classList.remove('down');
        orderWay = 'up';
    }

    sortLibrary(filterType, orderWay);
    renderType = 'renderAll';
    renderLibrary(renderType);
});
