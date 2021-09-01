"use strict";

const url = './animals.json';
const secondUrl = './meta-animals.json';

let requestURL = new XMLHttpRequest();
requestURL.open('GET', url);
requestURL.responseType = 'json';
requestURL.send();

// let requestURL = new XMLHttpRequest();
// requestURL.open('GET', secondUrl);
// requestURL.responseType = 'json';
// requestURL.send();

// Masz do dyspozycji dane w pliku "animals.json" i "meta-animals.json"

// Zadania wykonaj w Object Oriented Programming.

// Z danych zawartch w "animals.json" i "meta-animals.json":


// 	1. Wyświetl wszystkie rodzaje zwierząt 
function getAnimalsTypes(arr) {
    const typesList = [];
    arr.forEach(animal => typesList.push(animal.type));
    
    return typesList.filter((typeItem, index) => typesList.indexOf(typeItem) === index);
}

// 	2. Wyświetl wszystkie występujące rasy zwierząt z danego rodzaju (użytkownik ma mieć możliwość podania rodzaju)
function getSpecificAnimalsRace(arr, kindName) {
    const racesList = [];
    arr.filter(animal => animal.kind === kindName && racesList.push(animal.race))

    return racesList.filter((raceType, index) => racesList.indexOf(raceType) === index);
}

// 	3. Wylicz średnią wagę zwierząt danej rasy

// 	4. Wylicz średnią długość życia danej rasy

// 	5. Policz łączną liczbę kończyn (pomijając skrzydła) zwierząt

// 	6. Policz łączną liczbę kończyn danego rodzaju zwierząt 

// 	7. Policz stosunek liczby samców do samic dla danego rodzaju zwierząt

// 	8. Ile metanu wytworzą zwierzęta przez X lat życia

// 	9. Podaj średni wiek zwierząt




// 	1. Ile jaj dziennie dadzą kury nioski

// 	2. Ile jaj dziennie dadzą kury mięsne

// 	3. Która ilość jaj będzie większa

// 	4. Ile kg karmy potrzeba by wykarmić wszystkie kury w ciągu dnia

// 	5. Ile jest obecnych piskląt.

// 	6. Jaki jest stosunek samców do samic piskląt

// 	7. Jaka jest łączna waga wszystkich kur samic

// 	8. Jaka jest średnia waga wszystkich kur

// 	9. Jaka jest średnia waga kur niosek

// 	10. Jaka jest średnia waga kur mięsnych

// 	11. Średni wiek kur względem typu ('mięsna' lub 'nioska', wybierane przez użytkownika)



// 	1. Policz ile mleka dadzą krowy mleczne przez dzień

// 	2. Ile kg karmy potrzeby by wykarmić wszystkie krowy

// 	3. Jaki jest stosunek byków do krów?

// 	4. Ile metanu wytworzą krowy przez X lat życia

// 	5. Ile jest sutków (1 krowa ma 4 sutki) wśród krów

// 	6. Jaka jest łączna waga byków

// 	7. Jaka jest łączna waga krów

// 	8. Jaka jest łączna waga krów mięsnych

// 	9. Czy jest wystarczająca liczba byków, tak by każdy byk mógł pokryć 2 krowy? Jeżeli nie, zwróć informację, których zwierząt jest za mało.

// 	10. Średni wiek krów względem typu ('mięsna' lub 'nioska', wybierane przez użytkownika)



// 	1. Ile jest świń w gospodarstwie

// 	2. Ile odnóży posiadają łącznie wszystkie świnie

// 	3. Ile metanu wytworzą świnie przez X lat życia

// 	4. Jaka jest łączna waga macior

// 	5. Ile świń nie osiągneło dojrzałości płciowej



requestURL.onload = () => {
    const animals = requestURL.response;
    // console.log(animals);
    // console.log(getSpecificAnimalsRace(animals, 'świnia'));
    
}

// requestURL.onload = () => {
//     const metaAnimals = requestURL.response;
//     console.log(metaAnimals);
// }