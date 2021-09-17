

const data = require('./animals.json');
const metaData = require('./meta-animals.json');
// console.log(data);
// console.log(metaData)


// Masz do dyspozycji dane w pliku "animals.json" i "meta-animals.json"

// Zadania wykonaj w Object Oriented Programming.

// Z danych zawartch w "animals.json" i "meta-animals.json":

interface IAnimal {
    id: number,
    kind: string,
    type: string,
    race: string,
    sex: string,
    weight: number,
    age: number  
}

interface Unit {
    value: number,
    unit: string,
}

interface IMetaData {
    metanProductionPerDay: Unit,
    feedPerDay: Unit,
    maturity: Unit
}

interface IChickenMetaData extends IMetaData {
    eggsPerDay: number,
    averageLifeSpan: Unit
}

interface ICowMetaData extends IMetaData {
    milkPerDay: Unit
}

class AnimalItem implements IAnimal, IMetaData { 
    id: number;
    kind: string;
    type: string;
    race: string;
    sex: string;
    weight: number;
    age: number;
    metanProductionPerDay: Unit;
    feedPerDay: Unit;
    maturity: Unit;

    setAnimals(animalsData: IAnimal[]): IAnimal[] {
        return animalsData;
    }

    setMetaAnimalsData(metaAnimalData: IMetaData): IMetaData {
        return metaAnimalData;
    }

    getUniqueValues(itemsArr: string[]): string[] {
        return Array.from(new Set(itemsArr));
    }

    getTotal(itemsArr: number[]): number {
        return itemsArr.reduce((a: number, b: number) => a + b, 0);
    }

    getAverage(itemsArr: number[]): number {
        return this.getTotal(itemsArr) / itemsArr.length;
    }

    getAllTypes(): string[] {
        const typesList = this.setAnimals(data).map(animal => animal.type);
            return this.getUniqueValues(typesList);
    }

    getSpecificRaceList(kindName: string): string[] {
        const racesList: string[] = [];
        this.setAnimals(data).forEach(animal => animal.kind === kindName && racesList.push(animal.race));
            
        return this.getUniqueValues(racesList);
    }   

    getAverageWeightOfSpecificRace(raceName: string): number {
        let weightsList: number[] = [];
        this.setAnimals(data).forEach(animal => animal.race === raceName && weightsList.push(animal.weight));

        return this.getAverage(weightsList);
    }

    calculateLegsOfAllAnimals(): number {
        let chickensList: object[] = [];
        let cowsAndPigsList: object[] = [];

        this.setAnimals(data).forEach(animal => {
            switch (animal.kind) {
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

    calculateLegsOfSpecificKind(kindName: string): number {
        let chosenKindList: object[] = [];
        this.setAnimals(data).forEach(animal => {
            if (animal.kind === kindName) {
                chosenKindList.push(animal);
            }
        })

        switch (kindName) {
            case 'chicken':
                return chosenKindList.length * 2;
            case 'krowa' || 'świnia':
                return chosenKindList.length * 4;
            default:
                return;
        }
    }

    getMaleFemaleRatio(typeName: string): number {
        let malesList: object[] = [];
        let femalesList: object[] = [];

        this.setAnimals(data).forEach(animal => {
            if (animal.kind === typeName && animal.sex === 'male') {
                malesList.push(animal);
            } else if (animal.kind === typeName && animal.sex === 'female') {
                femalesList.push(animal);
            }
        })

        let sexRatio = malesList.length * 100 / femalesList.length;
        return sexRatio;
    }

    getAverageAgeOfAllAnimals(): number {
        let agesList = this.setAnimals(data).map(animal => animal.age);
        return this.getAverage(agesList);
    } 

    getMetanProductionInGivenNumsOfYears(givenNumOfYears: number): number {
        let metanProductionList: Unit[] = [];

        Object.values(this.setMetaAnimalsData(metaData)).forEach(item => {
            for (let value in item) {
                metanProductionList.push(item[value].metanProductionPerDay);
            }
        })

        let formattedMetanProductionValue = metanProductionList.map(item => 
            item.unit === 'g' ? item.value / 1000 : item.value
        )

        return this.getTotal(formattedMetanProductionValue) * givenNumOfYears;
    }
}

const animals = new AnimalItem();
// console.log(animals.setMetaAnimalsData(metaData)['cow']['mleczna']);
// console.log(animals.getMetanProductionInGivenNumsOfYears(20))

// 	1. Wyświetl wszystkie rodzaje zwierząt 

// 	2. Wyświetl wszystkie występujące rasy zwierząt z danego rodzaju (użytkownik ma mieć możliwość podania rodzaju) 

// 	3. Wylicz średnią wagę zwierząt danej rasy 

// 	4. Wylicz średnią długość życia danej rasy **

// 	5. Policz łączną liczbę kończyn (pomijając skrzydła) zwierząt

// 	6. Policz łączną liczbę kończyn danego rodzaju zwierząt 

// 	7. Policz stosunek liczby samców do samic dla danego rodzaju zwierząt

// 	8. Ile metanu wytworzą zwierzęta przez X lat życia

// 	9. Podaj średni wiek zwierząt

class ChickenItem extends AnimalItem implements IChickenMetaData {
    metanProductionPerDay: Unit;
    feedPerDay: Unit;
    maturity: Unit;
    eggsPerDay: number;
    averageLifeSpan: Unit;

    totalFemalesWeight(): number {
        let femalesWeightList: number[] = [];
        this.setAnimals(data).forEach(animal => {
            if (animal.kind === 'chicken' && animal.sex === 'female') {
                femalesWeightList.push(animal.weight);
            }
        })

        return this.getTotal(femalesWeightList);
    }

    getAverageWeightOfAllChickens(): number {
        let chickensWeigthList: number[] = [];
        this.setAnimals(data).forEach(animal => animal.kind === 'chicken' && chickensWeigthList.push(animal.weight));

        return this.getAverage(chickensWeigthList);
    }

    getAverageWeightOfNioski(): number {
        let weightsList: number[] = [];
        this.setAnimals(data).forEach(animal => animal.type === 'nioska' && weightsList.push(animal.weight));

        return this.getAverage(weightsList);
    }
}

const chickens = new ChickenItem();
// console.log(chickens.getAverageWeightOfNioski())

// 	1. Ile jaj dziennie dadzą kury nioski

// 	2. Ile jaj dziennie dadzą kury mięsne

// 	3. Która ilość jaj będzie większa

// 	4. Ile kg karmy potrzeba by wykarmić wszystkie kury w ciągu dnia

// 	5. Ile jest obecnych piskląt.

// 	6. Jaki jest stosunek samców do samic piskląt

// 	7. Jaka jest łączna waga wszystkich kur samic

// 	8. Jaka jest średnia waga wszystkich kur

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

interface MIlkGiver {
    milkPerDay: Unit;
    getMilkInDays: (days: number) => Unit;
}

class Animal implements IAnimal, IMetaData {}

class Chicken extends Animal implements IChickenMetaData {}

abstract class Cow extends Animal implements ICowMetaData {
    abstract getMilkInDays(days: number): Unit;
}
class Pig extends Animal {};

 class AnimalsManager {
     animals: Array<Animal>;

    constructor(animalsData: Array<IAnimal>, animalMetadata: Array<IMetaData>) {
        this.animals = this.createAnimalsFormData(animalsData, animalMetadata);
    }
    createAnimalsFormData(animalsData: Array<IAnimal>, animalMetadata: Array<IMetaData>): Array<Animal> {
        return [];
    }

    // getMilkByDays(days: number): Unit;
}
const animalManager = new AnimalsManager(data, metaData);