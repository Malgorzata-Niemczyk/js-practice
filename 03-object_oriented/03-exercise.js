"use strict";

const data = require('./animals.json');
const metaData = require('./meta-animals.json');
// console.log(data);
// console.log(metaData)


// Masz do dyspozycji dane w pliku "animals.json" i "meta-animals.json"

// Zadania wykonaj w Object Oriented Programming.

// Z danych zawartch w "animals.json" i "meta-animals.json":

class Animals {
    constructor(animalsList) {
        this.animals = animalsList;
    }

    removeDuplicatesFn(itemsArr) {
        return Array.from(new Set(itemsArr));
    }
}

const animalsArr = new Animals(data);
// console.log(animalsArr);


// 	1. Wyświetl wszystkie rodzaje zwierząt 
class AnimalTypes extends Animals {
    constructor(animalsList) {
        super(animalsList);
    }

    getTypes() {
        const typesList = this.animals.map(animal => animal.type);
        return this.removeDuplicatesFn(typesList)
    }
}

const animalTypes = new AnimalTypes(data);
// console.log(animalTypes.getTypes());


// 	2. Wyświetl wszystkie występujące rasy zwierząt z danego rodzaju (użytkownik ma mieć możliwość podania rodzaju)
class SpecificAnimalsRace extends Animals {
    constructor(animalsList) {
        super(animalsList);
    }

    getSpecificRace(kindName) {
        const racesList = [];
        this.animals.forEach(animal => animal.kind === kindName && racesList.push(animal.race))
    
        return this.removeDuplicatesFn(racesList);
    }
}

const animalsRace = new SpecificAnimalsRace(data);
// console.log(animalsRace.getSpecificRace('świnia'))


// 	3. Wylicz średnią wagę zwierząt danej rasy

// function getAverageWeight(arr, raceName) {
//     const total = 0;
//     const filteredAnimalsArr = arr.filter(animal => animal.race === raceName && (total += animal.weight));

//    return (total / filteredAnimalsArr.length).toFixed(2); 
// }

// 	4. Wylicz średnią długość życia danej rasy

// 	5. Policz łączną liczbę kończyn (pomijając skrzydła) zwierząt

// 	6. Policz łączną liczbę kończyn danego rodzaju zwierząt 

// 	7. Policz stosunek liczby samców do samic dla danego rodzaju zwierząt
// function getMaleFemaleRatio(arr, typeName) {
//     let malesList = [];
//     let femalesList = [];
//     arr.filter(animal => {
//         if (animal.kind === typeName & animal.sex === 'male') {
//             malesList.push(animal);
//         } else if (animal.kind === typeName & animal.sex === 'female') {
//             femalesList.push(animal);
//         }
//     })

//     let sexRatio = malesList.length * 100 / femalesList.length;
//     return (`${sexRatio.toFixed()} : 100`)
// }

// 	8. Ile metanu wytworzą zwierzęta przez X lat życia

// 	9. Podaj średni wiek zwierząt
// function getAverageAge(arr) {
//     let total = 0;
//     arr.forEach(animal => total += animal.age);

//     return (total / arr.length).toFixed(2); 
// }



// 	1. Ile jaj dziennie dadzą kury nioski

// 	2. Ile jaj dziennie dadzą kury mięsne

// 	3. Która ilość jaj będzie większa

// 	4. Ile kg karmy potrzeba by wykarmić wszystkie kury w ciągu dnia

// 	5. Ile jest obecnych piskląt.

// 	6. Jaki jest stosunek samców do samic piskląt

// 	7. Jaka jest łączna waga wszystkich kur samic
function totalFemalesWeight(arr) {
    let totalWeight = 0;
    arr.filter(animal => {
        if (animal.kind === 'chicken' && animal.sex === 'female') {
            totalWeight += animal.weight;
        }
    })

    return (totalWeight).toFixed(2)
}

// 	8. Jaka jest średnia waga wszystkich kur
function totalFemalesWeight(arr) {
    let totalWeight = 0;
    const chickensList = arr.filter(animal => animal.kind === 'chicken' && (totalWeight += animal.weight));
    
    return (totalWeight / chickensList.length).toFixed(2);
}

// 	9. Jaka jest średnia waga kur niosek
function getAverageWeightOfNioski(arr) {
    let weightsList = [];
    arr.forEach(animal => animal.type === 'nioska' && weightsList.push(animal.weight));

    return (weightsList.reduce((a, b) => a + b) / weightsList.length).toFixed(2);
}

// 	10. Jaka jest średnia waga kur mięsnych
function getAverageWeightOfMiesne(arr) {
    let weightsList = [];
    arr.forEach(animal => animal.type === 'mięsna' && weightsList.push(animal.weight));

    return (weightsList.reduce((a, b) => a + b) / weightsList.length).toFixed(2);

}

// 	11. Średni wiek kur względem typu ('mięsna' lub 'nioska', wybierane przez użytkownika)
function getAverageWeightOfCertainChickenTypes(arr, chickenType) {
    let totalWeight = 0;
    const chickensList = arr.filter(animal => animal.type === chickenType && (totalWeight += animal.weight))

    return (totalWeight / chickensList.length).toFixed(2);
}



// 	1. Policz ile mleka dadzą krowy mleczne przez dzień

// 	2. Ile kg karmy potrzeba, by wykarmić wszystkie krowy

// 	3. Jaki jest stosunek byków do krów?

// 	4. Ile metanu wytworzą krowy przez X lat życia

// 	5. Ile jest sutków (1 krowa ma 4 sutki) wśród krów

// 	6. Jaka jest łączna waga byków

// 	7. Jaka jest łączna waga krów

// 	8. Jaka jest łączna waga krów mięsnych

// 	9. Czy jest wystarczająca liczba byków, tak by każdy byk mógł pokryć 2 krowy? Jeżeli nie, zwróć informację, których zwierząt jest za mało.

// 	10. Średni wiek krów względem typu ('mięsna' lub 'nioska', wybierane przez użytkownika)
function averagCowsAge(arr, cowType) {
    const weightsArr = [];
    const cowsList = arr.filter(animal => animal.type === cowType && weightsArr.push(animal.weight));

    return (weightsArr.reduce((a, b) => a + b) / cowsList.length).toFixed(2);
}



// 	1. Ile jest świń w gospodarstwie

// 	2. Ile odnóży posiadają łącznie wszystkie świnie

// 	3. Ile metanu wytworzą świnie przez X lat życia

// 	4. Jaka jest łączna waga macior

// 	5. Ile świń nie osiągneło dojrzałości płciowej
