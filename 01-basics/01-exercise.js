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
// 	* została wydana najwcześniej

// 2. Znajdź książki które:
// 	* są wydane pomiędzy dwiema wybranymi datami,
// 	* mają rating większy/mniejszy niż szukany,

// 	* mają ilość stron w podanym przedziale,
let pageRangeBooks = [];

const findBookInPageRange = () => {
    
    books.map(book => {
        if (book.pages >= 700 && book.pages <= 920) {
            pageRangeBooks.push(book);
            return pageRangeBooks;
        }
    })
}

findBookInPageRange()

// 	* wszystkie kupione
let allBoughtBooks = [];

function findAllBoughtBooks() {

    for (let book of books) {
        if (book.bought === true) {
            allBoughtBooks.push(book);
            return allBoughtBooks;
        }
    }
}

findAllBoughtBooks()


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

// 	* sortowane wg podanego pola i kierunku sortowania

}