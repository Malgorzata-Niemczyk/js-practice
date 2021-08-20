const url = './books.json';

let requestURL = new XMLHttpRequest();
requestURL.open('GET', url);
requestURL.responseType = 'json';
requestURL.send();

requestURL.onload = () => {
    const books = requestURL.response;
    // console.log(books);

//     1. Znajdź książkę która:
// 	* ma najwięcej stron
// 	* ma najmniej stron,
function findBookWithTheHighestOrLowestNumOfPages() {
    const pagesArr = [];

    books.map(book => pagesArr.push(book.pages));
    const highestNum = Math.max(...pagesArr);
    const lowestNum = Math.min(...pagesArr);

    const foundBookWithTheHighestPages = books.find(book => book.pages === highestNum);
    const foundBookWithTheLowestPages = books.find(book => book.pages === lowestNum);

    return {
        foundBookWithTheHighestPages,
        foundBookWithTheLowestPages
    }    
}

findBookWithTheHighestOrLowestNumOfPages();

// 	* została wydana najwcześniej
function findBookWithTheEarliestDate() {
    const pagesArr = [];

    books.map(book => pagesArr.push(Date.parse(new Date(book.releaseDate))));
    const theEarliestReleaseDate = Math.min.apply(null, pagesArr);

    const getTheBookWithTheEarliestDate = books.find(book => {
        let releaseDate = Date.parse(new Date(book.releaseDate));
        return releaseDate === theEarliestReleaseDate;
    })

    return getTheBookWithTheEarliestDate;
}

findBookWithTheEarliestDate();

// 2. Znajdź książki które:
// 	* są wydane pomiędzy dwiema wybranymi datami,
function findBooksBetweenChosenDates() {
    const filteredRageDateBooks = [];
    const dateFrom = new Date('January 19, 1983 10:15:30');
    const dateTo = new Date('August 25, 1986 10:15:30');

    for (let i = 0; i < books.length; i++) {
        let bookReleaseDate = new Date(books[i].releaseDate);
        if (bookReleaseDate >= dateFrom && bookReleaseDate <= dateTo) {
            filteredRageDateBooks.push(books[i]);
        }
    }

    return filteredRageDateBooks;
}

findBooksBetweenChosenDates();

// 	* mają rating większy/mniejszy niż szukany,
const findgGreaterThanSearchedRating = () => {
    const booksWithFilteredRading = books.filter(book => book.rating < 2 || books.rating > 4);
    return booksWithFilteredRading;
}

findgGreaterThanSearchedRating();

// 	* mają ilość stron w podanym przedziale,
const findBookInPageRange = () => {
    const filteredBook = books.filter(book => book.pages >= 700 && book.pages <= 920);
    return filteredBook;
}

findBookInPageRange();

// 	* wszystkie kupione
function findAllBoughtBooks() {
    const allBoughtBooks = [];

    for (let book of books) {
        if (book.bought === true) {
            allBoughtBooks.push(book);
        }
    }

    return allBoughtBooks;
}

findAllBoughtBooks();

// 3. Przetwórz dane tak aby:
// 	* powstały array obiektów grupujących książki ze względu na currency (schemat {[currency: string]: Book[]}[])
// 	* otrzymać listę unikalnych imion autorów,
// 	* releaseDate była zmieniona w dowolny inny format docelowe formaty: 
// 		YYYY: 4-digit year
// 		YY: 2-digit year
// 		MM: 2-digit month (where January is 01 and December is 12)
// 		M: month from 1 to 12
// 		DD: 2-digit date (01 to 31)
// 		dd: 2-digit date (1 to 31)
// 		HH: 24-digit hour (0 to 23)
// 		hh: 12-digit hour (0 to 12) (need to add AM/PM)
// 		mm: Minutes (00 to 59)
// 		ss: Seconds (00 to 59)
// 		sss: Milliseconds (0 to 999)

function formatReleaseDate() {
    let fourDigitYear = books.map(book => (new Date(book.releaseDate)).getFullYear());
    let monthFrom1To12 = books.map(book => (new Date(book.releaseDate)).getMonth() + 1);
    let hour24digit = books.map(book => (new Date(book.releaseDate)).getHours());

    return {
        fourDigitYear,
        monthFrom1To12,
        hour24digit,
    }
    
}

formatReleaseDate();

// 	* sortowane wg podanego pola i kierunku sortowania

}