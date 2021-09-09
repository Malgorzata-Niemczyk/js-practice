'use strict';

const url = './data.json';

let requestURL = new XMLHttpRequest();
requestURL.open('GET', url);
requestURL.responseType = 'json';
requestURL.send();

// ************ Shared functions *****************//
function getTheMaxValueFn(itemsArr) {
    return itemsArr.map(item => item.length).reduce((a, b) => Math.max(a, b));
}

const removeDuplicatesFn = (itemsArr) => {
    // return Array.from(new Set(itemsArr));
    return itemsArr.filter((value, index) => itemsArr.indexOf(value) === index);
}

const repsCounterFn = arr => {
    const counter = {};
    arr.forEach(item => 
        counter[item]
            ? counter[item]++
            : counter[item] = 1
    )

    return counter;
}

const getWordsListFn = (itemsArr) => {
    return itemsArr.map(item => item.description.replace(/[^a-zA-Z ]/g, "").toLocaleLowerCase().split(' '));
}

// ***********************************

// Napisz metody, które:

// 	1. Zwracającą listę unikalnych nazw krajów w których żyli ludzie.
function findUniqueCountriesWherePeopleLivedBefore(arr) {
    const countriesList = arr
        .map(person => person.addresses)
        .flat()
        .map(address => address.country);
    return removeDuplicatesFn(countriesList);
}

// 	2. Zwracającą listę unikalnych nazw krajów w których ludzie żyją aktualnie.
function findUniqueCountriesWherePeopleCurrentlyLive(arr) {
    const countriesList = arr.map(person => person.actualAddress.country);
    return removeDuplicatesFn(countriesList);
}

// 	3. Zwracającą liczbę aktualnie mieszkających ludzi w danym kraju.
function getNumOfPeopleLivingInParticularCountry(arr, countryName) {
    return arr.filter(({actualAddress: {country}}) => country === countryName).length
}


// 	4. Zwracającą listę krajów, w których żyje więcej lub mniej ludzi niż X
function getSpecificCountriesList(arr, compareNum, comparisonType) {
    // 1. Przemapować listę i wyciągnąć z nich wszystkie kraje
    // 2. Policzyć ile razy dany kraj się powtarzał
    // 3. Sprawdzić, który kraj potwarzał się najczęściej, a który najmniej
    const countriesList = arr.map(person => person.actualAddress.country);

    const countriesRepsCounter = repsCounterFn(countriesList);

    const getCountryNames = comparatorFn => Object.entries(countriesRepsCounter)
    .filter(comparatorFn)
    .map(([country, ...rest]) => country);

    if (comparisonType === 'moreThan') {
        return getCountryNames(([countryName, count]) => count > compareNum);
    } else if (comparisonType === 'lessThan') {
        return getCountryNames(([countryName, count]) => count < compareNum);
    } else {
        throw new Error('Sorry, this property does not exist')
    }
}


// 	5. Zwracającą imiona, osób pracujących w największej lub najmniejszej firmie w danym czasie.

const hasPersonWorkedInGivenYear = (person, year) => {
    return person.jobs.some(job => workedInJobInGivenYear(job, year))
}

const workedInJobInGivenYear = (job, year) => {
    return new Date(job.startedAt).getFullYear() <= year && new Date(job.endedAt).getFullYear() >= year
}

const getJobsAtYear = (person, year) => {
    return person.jobs.filter(job => workedInJobInGivenYear(job, year));
}

const getCounterFn = (acc, curr, fieldName) => {
    if (acc[curr[fieldName]]) {
        acc[curr[fieldName]] += 1;
    } else {
        acc[curr[fieldName]] = 1;
    }
    return acc;
}

const getCounterForEmployeesInCompanyFn = (acc, curr) => {
    return getCounterFn(acc, curr, 'company')
    };

function getNames(arr, givenYear) {
    // 1. Przefiltrowanie ludzi pracujacych w danym roku
    // 2. Zakumulowal ludzi w danej firmie
    // 3. Zwrocil najmniejsza i najwieksza
    return arr.filter(p => hasPersonWorkedInGivenYear(p, givenYear))
        .map(p => getJobsAtYear(p, givenYear))
        .flat()
        .reduce(getCounterForEmployeesInCompanyFn, {});
}

// 	6. Zwracającą firmę, która płaci w sumie najwięcej lub najmniej swoim pracownikom.
// **** companies names: Advance, Beason, Conway, Kohatk, Leming, Roeville, Roeville, Steinhatchee, Witmer;
function getCompany(arr, searchedInfo) {
    // 1. Przemapować pracowników i wyciągnąć listę wszystkich prac
    // 2. Pogrupować listę prac według pracodawcy (klucz) zawierającą sumę płac
    // 3. Wyciągnąć pożądaną wartość z utworzonego obiektu

    const groupedJobs = arr
        .map(person => person.jobs)
        .flat()
        .reduce((acc, object) => {
            let key = object.company;
            if (!acc[key]) {
                acc[key] = object.salary.value;
            } else {
                acc[key] += object.salary.value;
            }
            return acc;
        }, {});

    if (searchedInfo === "the highest paying companies") {
        return Object.entries(groupedJobs)
            .reduce((acc, curr) => acc[1] < curr[1] ? curr : acc, ['', 0])[0];
    } else if (searchedInfo = "the lowest paying company") {
        return Object.entries(groupedJobs)
            .reduce((acc, curr) => acc[1] > curr[1] ? curr : acc, ['', 0])[0];
    } else {
        throw new Error('Sorry, this property does not exist')
    }

} 

// 	7. Zwracającą średnie wynagrodzenie pracownika w danej firmie.
function getAverageEarnings(arr, companyName) {
    const {counter, salarySum} = arr.map(person => person.jobs)
    .flat()
    .filter(job => job.company === companyName)
    .map(job => job.salary.value)
    .reduce((acc, curr) => ({counter: acc.counter++, salarySum: acc.salarySum + curr}), {counter: 0, salarySum: 0})
    
    return salarySum / counter.toFixed(2);
}

// 	8. Zwracającą osoby, które najwięcej o sobie opisały w polu description.
function getPeopleWithTheLongestDescription(arr) {
    const descriptionsList = arr.map(person => person.description)
    return arr.filter(person => person.description.length === getTheMaxValueFn(descriptionsList));
}

// 	9. Policz różne (unikalne) słowa wykorzystane w polu description.
function countUniqueWords(arr) {
    const wordsList = getWordsListFn(arr).flat();
    return removeDuplicatesFn(wordsList).length;
}

// 	10. Które słowa powtarzały się najczęściej, a które najrzadziej.
function findTheMostOrLeastRepeatedWords(arr) {
    const wordsList = getWordsListFn(arr);
    const flattenedWordsList = wordsList.flat();

    const wordsCounter = repsCounterFn(flattenedWordsList);

    let theMostRepeatedWords = Object.entries(wordsCounter).filter(([word, count]) => count === Math.max(...Object.values(wordsCounter)));
    let theLeastRepeatedWords = Object.entries(wordsCounter).filter(([word, count]) => count === Math.min(...Object.values(wordsCounter)));

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
    // 1. Przemapuj tablicę z osobami i wyodrębnij numery domów
    // 2. Policz ile razy dany numer się powtarzał
    // 3. Zajdź maksymalną ilość powtórzeń danego numeru
    const houseNumbersList = [];

    arr.forEach(person => {
        person.addresses.forEach(item => houseNumbersList.push(item.number));
        houseNumbersList.push(person.actualAddress.number);
    });

    const houseNumsRepsCounter = repsCounterFn(houseNumbersList);

    let theMostRepeatedHouseNum = [];
    Object.entries(houseNumsRepsCounter).filter(([houseNum, count]) => 
        count === Math.max(...Object.values(houseNumsRepsCounter)) && theMostRepeatedHouseNum.push(houseNum)
    );

    return theMostRepeatedHouseNum;
}

// 	13. Zwracającą ludzi, którzy mieli ciągłość pracy (tj. nie było ani jednego dnia przerwy pomiędzy pracami).
const hasPersonContinuousWork = (p) => {
    let isContinuous = true;
    p.jobs.reduce((acc, curr) => {
        if (new Date(acc.endedAt).getTime() - new Date(curr.startedAt).getTime() > 86400000) {
            isContinuous = false;
        }
        return curr;
    }, p.jobs[0]);

    return isContinuous;
}

function getPeopleWithContinuosWork(arr) {
    // 1. Sortowanie prac pracownika
    // 2. Sprawdzenie czy pracownik mial wiecej niz jedna prace
        // Jezeli tak, to sprawdzamy czy jest ciaglosc, jezeli nie to jest ciagla praca
    const jobSortFn = (prev, next) => new Date(prev.endedAt) > new Date(next.startedAt) ? 1 : -1;

    return arr.map(p => {
        p.jobs = sortPeople(p.jobs, jobSortFn);
        return p;
    })
    .filter(p => p.jobs.length === 1 || hasPersonContinuousWork(p))
}

// 	14. W którym roku pracowało najwięcej ludzi a w którym najmniej.
function getTheHighestOrLowestNumOfPeopleWorking(arr) {
    // 1. Wyodrębnić wszystkie prace z tablicy osób
    // 2. Znaleźć brakujące daty między rozpocząciem a zakończeniem danej pracy
    // 3. Policzyć ile razy każdy rok pracujący się powtarzał
    // 4. Wyciągnąć największą / najmniejszą wartość z tych powtórzeń
    const jobsList = arr.map(person => person.jobs);
    const flattenedJobsList = jobsList.flat();

    let yearsBetweenArr = [];
    flattenedJobsList.map(jobItem => {
        let startYear = new Date(jobItem.startedAt).getFullYear();
        let endYear = new Date(jobItem.endedAt).getFullYear();
        
        for (let i = startYear; i <= endYear; i++) {
            yearsBetweenArr.push(i);
        }
    });

    const yearsCounter = repsCounterFn(yearsBetweenArr);

    let yearsWithMaxCountResult = [];
    let yearsWithMinCountResult = [];

    Object.entries(yearsCounter).filter(([year, count]) => 
        count === Math.max(...Object.values(yearsCounter)) && yearsWithMaxCountResult.push(year)
    );
    Object.entries(yearsCounter).filter(([year, count]) => 
        count === Math.min(...Object.values(yearsCounter)) && yearsWithMinCountResult.push(year)
    );

    return {
        yearsWithMaxCountResult,
        yearsWithMinCountResult
    }
}

// 	15. Informującą ile osób pracowało w danym roku.
function findNumOfPeopleWorkingInSpecificYear(arr, givenYear) {
    return arr.map(person => person.jobs)
        .flat()
        .filter(jobItem => workedInJobInGivenYear(jobItem, givenYear)).length;
}

// 	16. Sortującą ludzi wg imienia, nazwiska, kraj zamieszkania, bądź nazwy firmy dla której ostatnio pracowali bądź dalej pracują.
const sortPeople = (arr, sortFn) => {
    return [...arr].sort(sortFn);
}

const getLastJob = (person) => {
    if (!person.jobs.length) {
        throw new Error (`Person does not have a job`);
    }

    return person.jobs.reduce((acc, curr) => 
        new Date(acc.endedAt) < new Date(curr.startedAt) ? curr : acc    
    , person.jobs[0])
} 

function sortPeopleByGivenProperty(arr, propertyName) {
    let comparator;

    switch(propertyName) {
        case 'firstname':
        case 'surname':
            comparator = (prev, next) =>
            prev[propertyName] > next[propertyName] ? 1 : -1;
            break;
        case 'country':
            comparator = ({actualAddress: preAddress}, {actualAddress: nextAddress}) => 
                preAddress.country > nextAddress.country ? 1 : -1;
            break;
        case 'company':
            comparator = (prev, next) => {
                const prevCompany = getLastJob(prev).company;
                const nextCompany = getLastJob(next).company

                return prevCompany > nextCompany ? 1 : -1;
            }
            break;
        default:
            throw new Error(`Cannot sort by ${propertyName}`);
    }

    return sortPeople(arr, comparator);
}

// 	17. Czy ktoś mieszka na tej samej ulicy, a jeżeli tak, to kto?
function getPeopleLivingOnTheSameStreet(arr, street, city, state, country) {
    const peoplesNames = [];

    const isTheSameAddress = person.actualAddress.street === street && person.actualAddress.city === city && person.actualAddress.state === state && person.actualAddress.country === country

    arr.forEach(person => {
        if (isTheSameAddress) {
            peoplesNames.push(`${person.surname} ${person.firstname}`);
        } else {
            throw new Error('Sorry, no results found')
        }
    })

    return peoplesNames.length > 1 ? peoplesNames : [];
}

// 	18. Jakie zdanie/zdania były najdłuższe (description)?
function findTheLongestSentence(arr) {
    const sentencesList = [];
    arr.forEach(person => sentencesList.push(person.description.split('. ')));
    const flattenedSentencesList = sentencesList.flat();
    
    return flattenedSentencesList.filter(sentence => sentence.length === getTheMaxValueFn(flattenedSentencesList));
}

// 	19. Jakie słowa mają liczbę znaków pomiędzy X a Y (description)?
function findWordsWithinCharactersRange(arr, charactersNumFrom, charactersNumTo) {
    const wordsList = getWordsListFn(arr);
    const flattenedWordsList = wordsList.flat();

    return flattenedWordsList.filter((word, index) => {
        return word.length >= charactersNumFrom && word.length <= charactersNumTo && flattenedWordsList.indexOf(word) === index;
    })
}

// 	20. Które stany są najbardziej zaludnione, a które najmniej?
function getTheMostAndLeastPopulatedState(arr, infoType) {
    const statesList = arr.map(person => person.actualAddress.state)
    
    const statesRepsCounter = repsCounterFn(statesList);

    const getResultsList = comparatorFn => Object.entries(statesRepsCounter)
        .filter(comparatorFn)
        .map(([state, ...rest]) => state)

    if (infoType === 'the most populated states') {
        return getResultsList(([state, count]) => 
            count === Math.max(...Object.values(statesRepsCounter))
        );
    } else if (infoType === 'the least populated states') {
        return getResultsList(([state, count]) => 
            count === Math.min(...Object.values(statesRepsCounter))
        )
    } else {
        throw new Error('Sorry, this property does not exist');
    }
}


////
requestURL.addEventListener('load', () => {
    const people = requestURL.response;
    // console.log(people);
    // people.map(person => console.log(person))
    // console.log(getNames(people, 1995));
    // console.table(sortPeopleByGivenProperty(people, 'company').map(p => getLastJob(p)))
    // console.log(getPeopleWithContinuosWork(people).map(p => p.jobs));
    // console.table(getNames(people, 1990))
    // console.log(findNumOfPeopleWorkingInSpecificYear(people, 2022))
    // console.log(getSpecificCountriesList(people, 400, 'lessThan'))
    // console.log(getCompany(people, "the highest paying companies"))
})