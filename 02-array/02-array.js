'use strict';

const url = './data.json';

let requestURL = new XMLHttpRequest();
requestURL.open('GET', url);
requestURL.responseType = 'json';
requestURL.send();

// Napisz metody, które:

// 	1. Zwracającą listę unikalnych nazw krajów w których żyli ludzie.
function findUniqueCountriesWherePeopleLivedBefore(arr) {
    const countriesList = [];
    arr.forEach(person => person.addresses.forEach(details => countriesList.push(details.country)))

    return countriesList.filter((value, index) => countriesList.indexOf(value) === index)
}

// 	2. Zwracającą listę unikalnych nazw krajów w których ludzie żyją aktualnie.
function findUniqueCountriesWherePeopleCurrentlyLive(arr) {
    const countriesList = [];
    arr.forEach(person => countriesList.push(person.actualAddress.country));

    return countriesList.filter((value, index) => countriesList.indexOf(value) == index);
}

// 	3. Zwracającą liczbę aktualnie mieszkających ludzi w danym kraju.
function getNumOfPeopleLivingInParticularCountry(arr, countryName) {
    const currentAddressesList = [];
    arr.forEach(person => currentAddressesList.push(person.actualAddress));

    return currentAddressesList.filter(addressDetails => addressDetails.country === countryName).length
}


// 	4. Zwracającą listę krajów, w których żyje więcej lub mniej ludzi niż X
function getSpecificCountriesList(arr, compareNum, comparisonType) {
    const countriesList = [];
    arr.forEach(person => countriesList.push(person.actualAddress.country));

    const countriesRepsCounter = {};
    countriesList.forEach(country => 
        countriesRepsCounter[country]
            ? countriesRepsCounter[country]++
            : countriesRepsCounter[country] = 1
    )

    let resultList = [];

    if (comparisonType === 'moreThan') {
        Object.entries(countriesRepsCounter).filter(([countryName, count]) => count > compareNum && resultList.push(countryName));
    } 
    
    if (comparisonType === 'lessThan') {
        Object.entries(countriesRepsCounter).filter(([countryName, count]) => count < compareNum && resultList.push(countryName));
    }
    
    return resultList;
}


// 	5. Zwracającą imiona, osób pracujących w największej lub najmniejszej firmie w danym czasie.

// 	6. Zwracającą firmę, która płaci w sumie najwięcej lub najmniej swoim pracownikom.
function getCompany(arr) {
    const jobsList = [];
    arr.forEach(person => jobsList.push(person.jobs));
    const flattenedJobsList = jobsList.flat();

    const groupedJobs = flattenedJobsList.reduce((acc, object) => {
        let key = object.company;
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push(object);
        return acc;

    }, {});
} // the solution is not finished yet

// 	7. Zwracającą średnie wynagrodzenie pracownika w danej firmie.
function getAverageEarnings(arr, companyName) {
    const jobsList = [];
    arr.forEach(person => jobsList.push(person.jobs));
    const flattenedJobsList = jobsList.flat();

    const salaryList = [];
    flattenedJobsList.filter(job => job.company === companyName && salaryList.push(job.salary.value));

    return (salaryList.reduce((a, b) => (a + b)) / salaryList.length).toFixed(2);
}

// 	8. Zwracającą osoby, które najwięcej o sobie opisały w polu description.
function getPeopleWithTheLongestDescription(arr) {
    const descriptionsList = [];
    arr.forEach(person => descriptionsList.push(person.description));
    const descriptionsLengthsArr = descriptionsList.map(sentence => sentence.length);
    const maxLength = Math.max(...descriptionsLengthsArr);

    return arr.filter(person => person.description.length === maxLength);
}

// 	9. Policz różne (unikalne) słowa wykorzystane w polu description.
function countUniqueWords(arr) {
    const wordsList = [];
    arr.forEach(person => wordsList.push(person.description.replace(/[^a-zA-Z ]/g, "").toLocaleLowerCase().split(' ')));
    const flattenedWordsList = wordsList.flat();
    
    return flattenedWordsList.filter((value, index) => flattenedWordsList.indexOf(value) === index).length;
}

// 	10. Które słowa powtarzały się najczęściej, a które najrzadziej.
function findTheMostOrLeastRepeatedWords(arr) {
    const wordsList = [];
    arr.forEach(person => wordsList.push(person.description.replace(/[^a-zA-Z ]/g, "").toLocaleLowerCase().split(' ')));
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
function groupByCurrentAddress(arr) {
    return arr.reduce((accumulator, object) => {
        let key = object.actualAddress.street;

        if (!accumulator[key]) {
            accumulator[key] = [];
        } 

        accumulator[key].push(object)
        return accumulator
    }, {})
}

// 	12. Jakie numery domów najczęściej się powtarzały.
function findTheMostRepeatedHouseNumbers(arr) {
    const houseNumbersList = [];

    arr.forEach(person => {
        person.addresses.forEach(item => houseNumbersList.push(item.number));
        houseNumbersList.push(person.actualAddress.number);
    });

    const houseNumsRepsCounter = {};
    houseNumbersList.forEach(houseNumber => houseNumsRepsCounter[houseNumber] ? houseNumsRepsCounter[houseNumber]++ : houseNumsRepsCounter[houseNumber] = 1);

    let maxCount = Math.max(...Object.values(houseNumsRepsCounter));

    let theMostRepeatedHouseNum = [];
    Object.entries(houseNumsRepsCounter).filter(([houseNum, count]) => count === maxCount && theMostRepeatedHouseNum.push(houseNum));

    return theMostRepeatedHouseNum;
}

// 	13. Zwracającą ludzi, którzy mieli ciągłość pracy (tj. nie było ani jednego dnia przerwy pomiędzy pracami).

// 	14. W którym roku pracowało najwięcej ludzi a w którym najmniej.
function getTheHighestOrLowestNumOfPeopleWorking(arr) {
    const jobsList = [];
    arr.forEach(person => jobsList.push(person.jobs));
    const flattenedJobsList = jobsList.flat(2);

    const yearCounter = {};
    flattenedJobsList.forEach(jobItem => {
        yearCounter[new Date(jobItem.startedAt).getFullYear()] 
            ? yearCounter[new Date(jobItem.startedAt).getFullYear()]++ 
            : yearCounter[new Date(jobItem.startedAt).getFullYear()] = 1});

    let maxCount = Math.max(...Object.values(yearCounter));
    let minCount = Math.min(...Object.values(yearCounter));

   const yearsWithMaxCount = Object.entries(yearCounter).filter(([year, count]) => count === maxCount);
   const yearsWithMinCount = Object.entries(yearCounter).filter(([year, count]) => count === minCount);

   return {
        yearsWithMaxCount,
        yearsWithMinCount
   }
}

// 	15. Informującą ile osób pracowało w danym roku.
function findNumOfPeopleWorkingInSpecificYear(arr, year) {
    const jobsList = [];
    arr.forEach(person => jobsList.push(person.jobs));
    const flattenedJobsList = jobsList.flat(2);
    
    return flattenedJobsList.filter(jobItem => 
        new Date(jobItem.startedAt).getFullYear() === year
    ).length
}

// 	16. Sortującą ludzi wg imienia, nazwiska, kraj zamieszkania, bądź nazwy firmy dla której ostatnio pracowali bądź dalej pracują.
function sortPeopleByGivenProperty(arr, propertyName) {
    return [...arr].sort((a, b) => {
        let propertyA = a[propertyName];
        let propertyB = b[propertyName];

        if (propertyA > propertyB) {
            return 1;
        } else if (propertyA < propertyB) {
            return -1;
        } else {
            return 0
        }
    });
} // works for the firstname and surname

// 	17. Czy ktoś mieszka na tej samej ulicy, a jeżeli tak, to kto?
function getPeopleLivingOnTheSameStreet(arr, streetName) {
    const peoplesNames = [];

    arr.forEach(person => {
        if (person.actualAddress.street === streetName) {
            peoplesNames.push(`${person.surname} ${person.firstname}`);
        }
    })

    return peoplesNames;
}

// 	18. Jakie zdanie/zdania były najdłuższe (description)?
function findTheLongestSentence(arr) {
    const sentencesList = [];
    arr.forEach(person => sentencesList.push(person.description.split('. ')));
    const flattenedSentencesList = sentencesList.flat();
    
    const sentencesLengthsArr = flattenedSentencesList.map(sentence => sentence.length);
    const maxLength = Math.max(...sentencesLengthsArr);

    return flattenedSentencesList.filter(sentence => sentence.length === maxLength);
}

// 	19. Jakie słowa mają liczbę znaków pomiędzy X a Y (description)?
function findWordsWithinCharactersRange(arr, charactersNumFrom, charactersNumTo) {
    const wordsList = [];
    arr.forEach(person => wordsList.push(person.description.split(' ')));
    const flattenedWordsList = wordsList.flat();

    return flattenedWordsList.filter((word, index) => {
        if (word.length >= charactersNumFrom && word.length <= charactersNumTo && flattenedWordsList.indexOf(word) === index) {
            return word;
        }
    })
}

// 	20. Które stany są najbardziej zaludnione, a które najmniej?
function getTheMostAndLeastPopulatedState(arr, infoType) {
    const statesList = [];
    arr.forEach(person => statesList.push(person.actualAddress.state))
    
    const statesRepsCounter = {};
    statesList.forEach(state => {
        statesRepsCounter[state] 
            ? statesRepsCounter[state]++
            : statesRepsCounter[state] = 1
    })

    const maxCount = Math.max(...Object.values(statesRepsCounter));
    const minCount = Math.min(...Object.values(statesRepsCounter));

    let resultList = [];

    if (infoType === 'the most populated states') {
        Object.entries(statesRepsCounter).filter(([stateName, count]) => count === maxCount && resultList.push(stateName));
    } else if (infoType === 'the least populated states') {
        Object.entries(statesRepsCounter).filter(([stateName, count]) => count === minCount && resultList.push(stateName));
    }

    return resultList;
}


////
requestURL.addEventListener('load', () => {
    const people = requestURL.response;
    // console.log(people);
    // people.map(person => console.log(person))
    console.log(getAverageEarnings(people, 'Steinhatchee'));
})