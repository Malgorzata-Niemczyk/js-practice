'use strict';

const url = './data.json';

let requestURL = new XMLHttpRequest();
requestURL.open('GET', url);
requestURL.responseType = 'json';
requestURL.send();

requestURL.addEventListener('load', () => {
    const people = requestURL.response;
    // console.log(people);
    // people.map(person => console.log(person))
    // console.log(getPeopleWithTheLongestDescription(people))
})


// Napisz metody, które:

// 	1. Zwracającą listę unikalnych nazw krajów w których żyli ludzie.
function findUniqueCountriesWherePeopleLivedBefore(arr) {
    const countriesList = [];

    arr.forEach(person => person.address.forEach(details => {
        if(!details.actualAddress) {
            countriesList.push(details.country)
        }
    }))

    return countriesList.filter((value, index) => countriesList.indexOf(value) === index)
}

// 	2. Zwracającą listę unikalnych nazw krajów w których ludzie żyją aktualnie.
function findUniqueCountriesWherePeopleCurrentlyLive(arr) {
    const countriesList = [];

    arr.forEach(person => person.address.forEach(details => {
        if(details.actualAddress) {
            countriesList.push(details.country)
        }
    }))

    return countriesList.filter((value, index) => countriesList.indexOf(value) === index);
}

// 	3. Zwracającą liczbę aktualnie mieszkających ludzi w danym kraju.


// 	4. Zwracającą listę krajów, w których żyje więcej lub mniej ludzi niż X

// 	5. Zwracającą imiona, osób pracująćych w największej lub najmniejszej firmie w danym czasie.

// 	6. Zwracającą firmę, która płaci w sumie najwięcej lub najmniej swoim pracownikom.

// 	7. Zwracającą średnie wynagrodzenie pracownika w danej firmie.

// 	8. Zwracającą osoby, które najwięcej o sobie opisały w polu description.
function getPeopleWithTheLongestDescription(arr) {
    const descriptionsList = [];
    arr.forEach(person => descriptionsList.push(person.description));
    const descriptionsLengthsArr = descriptionsList.map(sentence => sentence.length);
    const maxLength = Math.max(...descriptionsLengthsArr);

    return arr.filter(person => {
        if (person.description.length === maxLength) {
            return person;
        }
    })
}

// 	9. Policz różne (unikalne) słowa wykorzystane w polu description.
function countUniqueWords(arr) {
    const wordsList = [];
    
    arr.forEach(person => wordsList.push(person.description.split(' ')));

    const flattenedWordsList = wordsList.flat();
    
    return flattenedWordsList.filter((value, index) => flattenedWordsList.indexOf(value) === index).length;
}

// 	10. Które słowa powtarzały się najczęściej, a które najrzadziej.
function findTheMostOrLeastRepeatedWords(arr) {
    const wordsList = [];
    arr.forEach(person => wordsList.push(person.description.split(' ')));
    const flattenedWordsList = wordsList.flat();

    const wordsCounter = {};
    flattenedWordsList.forEach(word => wordsCounter[word] ? wordsCounter[word]++ : wordsCounter[word] = 1);

    let maxCount = Math.max(...Object.values(wordsCounter));
    let minCount = Math.min(...Object.values(wordsCounter));

    let theMostRepeatedWords = Object.entries(wordsCounter).filter(([word, count]) => count === maxCount);

    let theLeastRepeatedWords = Object.entries(wordsCounter).filter(([word, count]) => count === minCount);

    return {
        theMostRepeatedWords,
        theLeastRepeatedWords
    }
}

// 	11. Pogrupuj ludzi wg. zamieszkania (nazwa ulicy).

// 	12. Jakie numery domów najczęściej się potwarzały.

// 	13. Zwracającą ludzi, którzy mieli ciągłość pracy (tj. nie było ani jednego dnia przerwy pomiędzy pracami).

// 	14. W którym roku pracowało najwięcej ludzi a w którym najmniej.

// 	15. Informującą ile osób pracowało w danym roku.

// 	16. Sortującą ludzi wg imienia, nazwiska, kraj zamieszkania, bądź nazwy firmy dla której ostatnio pracowali bądź dalej pracują.

// 	17. Czy ktoś mieszka na tej samej ulicy, a jeżeli tak, to kto?

// 	18. Jakie zdanie/zdania były najdłuższe (description)?
function findTheLongestSentence(arr) {
    const sentencesList = [];
    arr.forEach(person => sentencesList.push(person.description));

    const sentencesLengthsArr = sentencesList.map(sentence => sentence.length);
    const maxLength = Math.max(...sentencesLengthsArr);

    return sentencesList.filter(sentence => sentence.length === maxLength);
}

// 	19. Jakie słowa mają liczbę znaków pomiędzy X a Y (description)?


// 	20. Które stany są najbardziej zaludnione, a które najmniej?