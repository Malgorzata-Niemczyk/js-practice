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
    arr.map(person => person.addresses.map(details => countriesList.push(details.country)))

    return countriesList.filter((value, index) => countriesList.indexOf(value) === index)
}

// 	2. Zwracającą listę unikalnych nazw krajów w których ludzie żyją aktualnie.
function findUniqueCountriesWherePeopleCurrentlyLive(arr) {
    const countriesList = arr.map(person => person.actualAddress.country);

    return countriesList.filter((value, index) => countriesList.indexOf(value) == index);
}

// 	3. Zwracającą liczbę aktualnie mieszkających ludzi w danym kraju.
function getNumOfPeopleLivingInParticularCountry(arr, countryName) {
    return arr.map(person => person.actualAddress).filter(addressDetails => addressDetails.country === countryName).length
}


// 	4. Zwracającą listę krajów, w których żyje więcej lub mniej ludzi niż X
function getSpecificCountriesList(arr, compareNum, comparisonType) {
    const countriesList = arr.map(person => person.actualAddress.country);

    const countriesRepsCounter = {};
    countriesList.map(country => 
        countriesRepsCounter[country]
            ? countriesRepsCounter[country]++
            : countriesRepsCounter[country] = 1
    )

    let resultList = [];

    if (comparisonType === 'moreThan') {
        Object.entries(countriesRepsCounter).filter(([countryName, count]) => count > compareNum && resultList.push(countryName));
    } else if (comparisonType === 'lessThan') {
        Object.entries(countriesRepsCounter).filter(([countryName, count]) => count < compareNum && resultList.push(countryName));
    } else {
        throw new Error('Sorry, this property does not exist')
    }

    return resultList;
}


// 	5. Zwracającą imiona, osób pracujących w największej lub najmniejszej firmie w danym czasie.
function getNames(arr, givenYear) {
    const jobsList = [];
    arr.map(person => jobsList.push(person.jobs));
    const flattenedJobsList = jobsList.flat();

    const groupedJobs = flattenedJobsList.reduce((acc, object) => {
        let key = object.company;
        if (!acc[key]) {
            acc[key] = []
        }

        acc[key].push(object);
        return acc;
    }, {});
    // console.log(groupedJobs)
    
    Object.entries(groupedJobs).map(([company, arr]) => {
        arr.map(jobItem => {
            let yearsBetweenArr = [];
            let startYear = new Date(jobItem.startedAt).getFullYear();
            let endYear = new Date(jobItem.endedAt).getFullYear();

            for (let i = startYear; i <= endYear; i++) {
                yearsBetweenArr.push(i);
            }

            const yearsCounter = {};
            yearsBetweenArr.forEach(year =>
                yearsCounter[year] ? yearsCounter[year]++ : yearsCounter[year] = 1
            )
        })
    })
}

// 	6. Zwracającą firmę, która płaci w sumie najwięcej lub najmniej swoim pracownikom.
// **** companies names: Advance, Beason, Conway, Kohatk, Leming, Roeville, Roeville, Steinhatchee, Witmer;
function getCompany(arr, searchedInfo) {
    let totalSalary = 0;

    const jobsList = arr.map(person => person.jobs);
    const flattenedJobsList = jobsList.flat();

    const groupedJobs = flattenedJobsList.reduce((acc, object) => {
        let key = object.company;
        if (!acc[key]) {
            acc[key] = []
        }

        acc[key].push(object.salary.value);
        return acc;
    }, {});

    const jobSalaryPairs = [];
    Object.entries(groupedJobs).forEach(([companyName, salariesArr]) => {
        salariesArr.forEach(salary => totalSalary += salary);
        jobSalaryPairs.push([companyName, totalSalary]);
    })

    const transformedJobSalaryPairs = Object.fromEntries(jobSalaryPairs);
    
    const salariesSums = Object.values(transformedJobSalaryPairs);
    const maxSum = Math.max(...salariesSums);
    const minSum = Math.min(...salariesSums);

    let searchedCompany = [];
    if (searchedInfo === "the highest paying companies") {
        Object.entries(transformedJobSalaryPairs).filter(([company, sum]) => sum === maxSum && searchedCompany.push(company))
    } else if (searchedInfo = "the lowest paying company") {
        Object.entries(transformedJobSalaryPairs).filter(([company, sum]) => sum === minSum && searchedCompany.push(company))
    } else {
        throw new Error('Sorry, this property does not exisit')
    }

    return searchedCompany;
} 

// 	7. Zwracającą średnie wynagrodzenie pracownika w danej firmie.
function getAverageEarnings(arr, companyName) {
    const jobsList = arr.map(person => person.jobs);
    const flattenedJobsList = jobsList.flat();

    const salaryList = [];
    flattenedJobsList.filter(job => job.company === companyName && salaryList.push(job.salary.value));

    return (salaryList.reduce((a, b) => (a + b)) / salaryList.length).toFixed(2);
}

// 	8. Zwracającą osoby, które najwięcej o sobie opisały w polu description.
function getPeopleWithTheLongestDescription(arr) {
    const descriptionsList = arr.map(person => person.description);

    return arr.filter(person => person.description.length === getTheMaximumValue(descriptionsList));
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
    houseNumbersList.map(houseNumber => 
        houseNumsRepsCounter[houseNumber] 
            ? houseNumsRepsCounter[houseNumber]++ 
            : houseNumsRepsCounter[houseNumber] = 1);

    let maxCount = Math.max(...Object.values(houseNumsRepsCounter));

    let theMostRepeatedHouseNum = [];
    Object.entries(houseNumsRepsCounter).filter(([houseNum, count]) => count === maxCount && theMostRepeatedHouseNum.push(houseNum));

    return theMostRepeatedHouseNum;
}

// 	13. Zwracającą ludzi, którzy mieli ciągłość pracy (tj. nie było ani jednego dnia przerwy pomiędzy pracami).
function getPeopleWithContinuosWork(arr) {
    arr.forEach(person => {
        if (person.jobs.length > 1) {
            const sortedArr = person.jobs.sort((a, b) => {
                let propertyA = a.startedAt;
                let propertyB = b.startedAt;
        
                if (propertyA > propertyB) {
                    return 1;
                } else if (propertyA < propertyB) {
                    return -1;
                } else {
                    return 0
                }
            })
           
            sortedArr.filter(job => {
                const datesDiff = new Date(job.startedAt).getTime() - new Date(job.endedAt).getTime();

                const dayInMilisec = 86400000;

                if (datesDiff <= dayInMilisec) {
                    return `${person.firstname} ${person.surname}`
                }
            })
        }
    })
} //***solution not finished yet

// 	14. W którym roku pracowało najwięcej ludzi a w którym najmniej.
function getTheHighestOrLowestNumOfPeopleWorking(arr) {
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
    
    const yearsCounter = {};
    yearsBetweenArr.map(year =>
        yearsCounter[year] ? yearsCounter[year]++ : yearsCounter[year] = 1
    )

    let maxCount = Math.max(...Object.values(yearsCounter));
    let minCount = Math.min(...Object.values(yearsCounter));

    let yearsWithMaxCountResult = [];
    let yearsWithMinCountResult = [];

    Object.entries(yearsCounter).filter(([year, count]) => count === maxCount && yearsWithMaxCountResult.push(year));
    Object.entries(yearsCounter).filter(([year, count]) => count === minCount && yearsWithMinCountResult.push(year));

    return {
        yearsWithMaxCountResult,
        yearsWithMinCountResult
    }
}

// 	15. Informującą ile osób pracowało w danym roku.
function findNumOfPeopleWorkingInSpecificYear(arr, year) {
    const jobsList = arr.map(person => person.jobs);
    const flattenedJobsList = jobsList.flat();
    
    return flattenedJobsList.filter(jobItem => 
        new Date(jobItem.startedAt).getFullYear() === year
    ).length
}

// 	16. Sortującą ludzi wg imienia, nazwiska, kraj zamieszkania, bądź nazwy firmy dla której ostatnio pracowali bądź dalej pracują.
const isSorted = (itemA, itemB) => {
    if (itemA > itemB) {
        return 1;
    } else if (itemA < itemB) {
        return -1;
    } else {
        return 0
    }
}

function sortPeopleByGivenProperty(arr, propertyName) {
    if (propertyName === 'firstname' || 'surname') {
        return [...arr].sort((a, b) => {
            let propertyA = a[propertyName];
            let propertyB = b[propertyName];
        
            return isSorted(propertyA, propertyB);
        });
    }

    if (propertyName === 'country') {
        return [...arr].sort((a, b) => {
            let propertyA = a.actualAddress.country;
            let propertyB = b.actualAddress.country;

            return isSorted(propertyA, propertyB);
        })
    }
} // ***works for the firstname, surname and country

// 	17. Czy ktoś mieszka na tej samej ulicy, a jeżeli tak, to kto?
function getPeopleLivingOnTheSameStreet(arr, street, city, state, country) {
    const peoplesNames = [];

    arr.forEach(person => {
        if (person.actualAddress.street === street && person.actualAddress.city === city && person.actualAddress.state === state && person.actualAddress.country === country) {
            peoplesNames.push(`${person.surname} ${person.firstname}`);
        }
    })

    return peoplesNames.length > 1 ? peoplesNames : [];
}

// 	18. Jakie zdanie/zdania były najdłuższe (description)?
function findTheLongestSentence(arr) {
    const sentencesList = [];
    arr.forEach(person => sentencesList.push(person.description.split('. ')));
    const flattenedSentencesList = sentencesList.flat();
    
    return flattenedSentencesList.filter(sentence => sentence.length === getTheMaximumValue(flattenedSentencesList));
}

// 	19. Jakie słowa mają liczbę znaków pomiędzy X a Y (description)?
function findWordsWithinCharactersRange(arr, charactersNumFrom, charactersNumTo) {
    const wordsList = arr.map(person => person.description.replace(/[^a-zA-Z ]/g, "").toLocaleLowerCase().split(' '));
    const flattenedWordsList = wordsList.flat();

    return flattenedWordsList.filter((word, index) => {
        if (word.length >= charactersNumFrom && word.length <= charactersNumTo && flattenedWordsList.indexOf(word) === index) {
            return word;
        }
    })
}

// 	20. Które stany są najbardziej zaludnione, a które najmniej?
function getTheMostAndLeastPopulatedState(arr, infoType) {
    const statesList = arr.map(person => person.actualAddress.state)
    
    const statesRepsCounter = {};
    statesList.map(state => {
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
    } else {
        throw new Error('Sorry, this property does not exist');
    }

    return resultList;
}

// ************ Shared functions *****************//
function getTheMaximumValue(itemsArr) {
    return itemsArr.map(item => item.length).reduce((a, b) => Math.max(a, b));
}




////
requestURL.addEventListener('load', () => {
    const people = requestURL.response;
    // console.log(people);
    // people.map(person => console.log(person))
    console.log(sortPeopleByGivenProperty(people, 'country'));
})