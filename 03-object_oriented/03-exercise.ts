

const data = require('./animals.json');
const metaData = require('./meta-animals.json');
// console.log(data);
// console.log(metaData)


// Masz do dyspozycji dane w pliku "animals.json" i "meta-animals.json"

// Zadania wykonaj w Object Oriented Programming.

// Z danych zawartch w "animals.json" i "meta-animals.json":

interface Animal {
    id: number,
    kind: string,
    type: string,
    race: string,
    sex: string,
    weight: number,
    age: number  
}

interface Chicken {
    [key: string]: {
        [key: string]: {
            eggsPerDay: number,
            averageLifespan: {
                value: number,
                unit: string
            },
            metanProductionPerDay: {
                value: number,
                unit: string
            }, 
            feedPerDay: {
                value: number,
                unit: string
            },
            maturity: {
                value: number,
                unit: string
            }
        }
    }
}

interface Cow {
    [key: string]: {
        [key: string]: {
            feedPerDay: {
                value: number,
                unit: string
            },
            milkPerDay: {
                value: number,
                unit: string
            },
            metanProductionPerDay: {
                value: number,
                unit: string
            },
            maturity: {
                value: number,
                unit: string 
            }
        }
    }
}

interface Pig {
    [key: string]: {
        [key: string]: {
            feedPerDay: {
                value: number,
                unit: string
            }, 
            metanProductionPerDay: {
                value: number,
                unit: string
            },
            maturity: {
                value: number,
                unit: string 
            }
        }
    }
}

class Animals { 
    animals: Animal[] = data;
    metaAnimalsData: any = metaData;

    getUniqueValues(itemsArr: string[]) {
        return Array.from(new Set(itemsArr));
    }

    getTypes() {
        const typesList = this.animals.map(animal => animal.type);
            return this.getUniqueValues(typesList);
    }

    getTotal(itemsArr: number[]) {
        return itemsArr.reduce((a: number, b: number) => a + b);
    }

    getAverage(itemsArr: number[]) {
        return this.getTotal(itemsArr) / itemsArr.length;
    }
}

const animalsList = new Animals();
// console.log(animalsList)

// 	1. Wyświetl wszystkie rodzaje zwierząt
animalsList.getTypes();
// console.log(animals.getTypes());


// 	2. Wyświetl wszystkie występujące rasy zwierząt z danego rodzaju (użytkownik ma mieć możliwość podania rodzaju)
class SpecificAnimalsRace {
    animalsListTwo = new Animals();

    getSpecificRace(kindName: string): string[] {
        const racesList: string[] = [];
        this.animalsListTwo.animals.forEach(animal => animal.kind === kindName && racesList.push(animal.race))
            
        return this.animalsListTwo.getUniqueValues(racesList);
    }   
}

const animalsRace = new SpecificAnimalsRace();
animalsRace.getSpecificRace('krowa');
// console.log(animalsRace.getSpecificRace('krowa'));


// 	3. Wylicz średnią wagę zwierząt danej rasy
function getAverageWeight(raceName: string): number {
    let weightsList: number[] = [];
    animalsList.animals.forEach(animal => animal.race === raceName && weightsList.push(animal.weight));

   return animalsList.getAverage(weightsList);
}

// console.log(getAverageWeight('kokhinhin'))

// 	4. Wylicz średnią długość życia danej rasy

// 	5. Policz łączną liczbę kończyn (pomijając skrzydła) zwierząt
function calculateLimbs() {
    let chickensList = [];
    let cowsAndPigsList = [];
    
    animalsList.animals.forEach(animal => {
        switch(animal.kind) {
            case 'chicken':
                chickensList.push(animal);
            break;
            case 'krowa' || 'świnia':
                cowsAndPigsList.push(animal);
            break;
            default:
                return [];

        }
    })

    return (chickensList.length * 2) + (cowsAndPigsList.length * 4);
}

console.log(calculateLimbs());

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
let agesList = animalsList.animals.map(animal => animal.age);
animalsList.getTotal(agesList).toFixed(2);
// console.log(animalsList.getTotal(agesList).toFixed(2))



// 	1. Ile jaj dziennie dadzą kury nioski

// 	2. Ile jaj dziennie dadzą kury mięsne

// 	3. Która ilość jaj będzie większa

// 	4. Ile kg karmy potrzeba by wykarmić wszystkie kury w ciągu dnia

// 	5. Ile jest obecnych piskląt.

// 	6. Jaki jest stosunek samców do samic piskląt

// 	7. Jaka jest łączna waga wszystkich kur samic

// function totalFemalesWeight(arr) {
//     let totalWeight = 0;
//     arr.filter(animal => {
//         if (animal.kind === 'chicken' && animal.sex === 'female') {
//             totalWeight += animal.weight;
//         }
//     })

//     return (totalWeight).toFixed(2)
// }

// 	8. Jaka jest średnia waga wszystkich kur
// function totalChickensWeight(arr) {
//     let totalWeight = 0;
//     const chickensList = arr.filter(animal => animal.kind === 'chicken' && (totalWeight += animal.weight));
    
//     return (totalWeight / chickensList.length).toFixed(2);
// }

// 	9. Jaka jest średnia waga kur niosek
// function getAverageWeightOfNioski(arr) {
//     let weightsList = [];
//     arr.forEach(animal => animal.type === 'nioska' && weightsList.push(animal.weight));

//     return (weightsList.reduce((a, b) => a + b) / weightsList.length).toFixed(2);
// }

// 	10. Jaka jest średnia waga kur mięsnych
// function getAverageWeightOfMiesne(arr) {
//     let weightsList = [];
//     arr.forEach(animal => animal.type === 'mięsna' && weightsList.push(animal.weight));

//     return (weightsList.reduce((a, b) => a + b) / weightsList.length).toFixed(2);
// }

// 	11. Średni wiek kur względem typu ('mięsna' lub 'nioska', wybierane przez użytkownika)
// function getAverageWeightOfCertainChickenTypes(arr, chickenType) {
//     let totalWeight = 0;
//     const chickensList = arr.filter(animal => animal.type === chickenType && (totalWeight += animal.weight))

//     return (totalWeight / chickensList.length).toFixed(2);
// }



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
// function averagCowsAge(arr, cowType) {
//     const weightsArr = [];
//     const cowsList = arr.filter(animal => animal.type === cowType && weightsArr.push(animal.weight));

//     return (weightsArr.reduce((a, b) => a + b) / cowsList.length).toFixed(2);
// }



// 	1. Ile jest świń w gospodarstwie

// 	2. Ile odnóży posiadają łącznie wszystkie świnie

// 	3. Ile metanu wytworzą świnie przez X lat życia

// 	4. Jaka jest łączna waga macior

// 	5. Ile świń nie osiągneło dojrzałości płciowej
