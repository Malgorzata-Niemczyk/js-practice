"use strict";

const url = './books.json';

let requestURL = new XMLHttpRequest();
requestURL.open('GET', url);
requestURL.responseType = 'json';
requestURL.send();

requestURL.onload = () => {
    const books = requestURL.response;
    // console.log(books);

    // findBooksWithTheLowestNumOfPages(books);
    // groupByCurrency(books, "currency");
    
}

//     1. Znajdź książkę która:
    // 	* ma najmniej stron,
    function findBooksWithTheLowestNumOfPages(arr) {
        const pagesArr = [];

        arr.forEach(item => pagesArr.push(item.pages));
        const lowestNum = Math.min(...pagesArr);

        return arr.filter(item => item.pages === lowestNum);
    }
    
    

     //  * ma najwięcej stron
    function findBooksWithTheHighestNumOfPages(arr) {
        const pagesArr = [];

        arr.forEach(item => pagesArr.push(item.pages));
        const highestNum = Math.max(...pagesArr);

        return arr.filter(item => item.pages === highestNum);  
    }

    // findBooksWithTheHighestNumOfPages(books);


    // 	* została wydana najwcześniej
    function findBookWithTheEarliestDate(arr) {
        const datesArr = [];
        arr.forEach(item => datesArr.push(Date.parse(item.releaseDate)));
        const theEarliestReleaseDate = Math.min(...datesArr);

        const getTheBookWithTheEarliestDate = arr.filter(item => {
            let releaseDate = Date.parse(item.releaseDate);
            return releaseDate === theEarliestReleaseDate;
        })

        return getTheBookWithTheEarliestDate;
    }

    // findBookWithTheEarliestDate(books);


    // 2. Znajdź książki które:
    // 	* są wydane pomiędzy dwiema wybranymi datami,
    function findBooksBetweenChosenDates(arr, dateFrom, dateTo) {
        return arr.filter(item => {
            return Date.parse(item.releaseDate) >= Date.parse(dateFrom) && Date.parse(item.releaseDate) <= Date.parse(dateTo);
        })
    }

    // findBooksBetweenChosenDates(books, new Date('January 19, 1983 10:15:30'), new Date('August 25, 1986 10:15:30'));

    // 	* mają rating większy/mniejszy niż szukany,
    const findGreaterOrLowerThanSearchedRating = (arr, ratingLowerThanSearched, ratingHigherThanSearched) => {
        return arr.filter(item => item.rating < ratingLowerThanSearched || item.rating > ratingHigherThanSearched);
    }

    // findGreaterOrLowerThanSearchedRating(books, 2, 4);


    // 	* mają ilość stron w podanym przedziale,
    const findBookInPageRange = (arr, pageFrom, pageTo) => {
        return arr.filter(item => item.pages >= pageFrom && item.pages <= pageTo);
    }

    // findBookInPageRange(books, 720, 900);


    // 	* wszystkie kupione
    function findAllBoughtBooks(arr) {
        return arr.filter(item => item.bought);
    }

    // findAllBoughtBooks(books);


    // 3. Przetwórz dane tak aby:
    // 	* powstały array obiektów grupujących książki ze względu na currency (schemat {[currency: string]: Book[]})
    function groupByCurrency(objectArr, property) {
        return objectArr.reduce((accumulator, object) => {
            let key = object[property];
            if (!accumulator[key]) {
                accumulator[key] = [];
            } 

            accumulator[key].push(object)
            return accumulator
        }, {})
    }

    // groupByCurrency(books, "currency");


    // 	* otrzymać listę unikalnych nazwisk autorów,
    function getUniqueSurnames(arr) {
        const authorsList = [];
        arr.forEach(item => authorsList.push(item.author.surname));

        return authorsList.filter((item, index) => authorsList.indexOf(item) === index)
    }
    // getUniqueSurnames(books);

    // 	* releaseDate była zmieniona w dowolny inny format docelowe formaty: 
    // 		YYYY: 4-digit year *
    // 		YY: 2-digit year
    // 		MM: 2-digit month (where January is 01 and December is 12) *
    // 		M: month from 1 to 12 *
    // 		DD: 2-digit date (01 to 31) *
    // 		dd: 2-digit date (1 to 31) *
    // 		HH: 24-digit hour (0 to 23) *
    // 		hh: 12-digit hour (0 to 12) (need to add AM/PM)
    // 		mm: Minutes (00 to 59) *
    // 		ss: Seconds (00 to 59) *
    // 		sss: Milliseconds (0 to 999)

    function formatReleaseDate() {
        let fourDigitYear = books.map(book => new Date(book.releaseDate).getFullYear());

        let monthFrom1To12 = books.map(book => new Date(book.releaseDate).getMonth() + 1);

        let twoDigitMonth = books.map(book => {
            return new Date(book.releaseDate).getMonth() + 1 < 10
                    ? `0${new Date(book.releaseDate).getMonth() + 1}`
                    :new Date(book.releaseDate).getMonth() + 1
        });
        let date = books.map(book => new Date(book.releaseDate).getDate());

        let twoDigitDate = books.map(book => {
            return new Date(book.releaseDate).getDate() < 10
                    ? `0${new Date(book.releaseDate).getDate()}`
                    : new Date(book.releaseDate).getDate()
        });

        let hour24digit = books.map(book => new Date(book.releaseDate).getHours());

        let minutes = books.map(book => {
            return new Date(book.releaseDate).getMinutes() < 10
                    ? `0${new Date(book.releaseDate).getMinutes()}`
                    : new Date(book.releaseDate).getMinutes()
        });

        let seconds = books.map(book => {
            return new Date(book.releaseDate).getSeconds() < 10
                    ? `0${new Date(book.releaseDate).getSeconds()}`
                    : new Date(book.releaseDate).getSeconds()
        });

        return {
            fourDigitYear,
            monthFrom1To12,
            twoDigitMonth,
            date,
            twoDigitDate,
            hour24digit,
            minutes,
            seconds
        }
        
    }

    // formatReleaseDate();

    // 	* sortowane wg podanego pola i kierunku sortowania
    function sortedBooksbyAuthorSurname(arr) {
        const sortedBooks = [...arr].sort((a, b) => {
            let authorOne = a.author.surname.toLocaleLowerCase();
            let authorTwo = b.author.surname.toLocaleLowerCase();

            if (authorOne > authorTwo) {
                return 1;
            } else if (authorOne < authorTwo) {
                return -1;
            } else {
                return 0;
            }

        })

        return sortedBooks;
    }

    // sortedBooksbyAuthorSurname(books);