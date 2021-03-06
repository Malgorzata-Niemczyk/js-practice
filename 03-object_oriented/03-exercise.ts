

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

class Animal implements IAnimal, IMetaData { 
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
}

class AnimalsManager {
    animals: Array<Animal>;

    constructor(animalsData: Array<IAnimal>, animalMetadata: Array<IMetaData>) {
       this.animals = this.createAnimalsFromData(animalsData, animalMetadata);
    }
    
    createAnimalsFromData(animalsData: Array<IAnimal>, animalMetadata: Array<IMetaData>): Array<Animal> {
        return [];
    }

   getUniqueValues(itemsArr: string[]): string[] {
    return Array.from(new Set(itemsArr));
    }

    getSum(itemsArr: number[]): number {
        return itemsArr.reduce((a: number, b: number) => a + b, 0);
    }

    getAverage(itemsArr: number[]): number {
        return this.getSum(itemsArr) / itemsArr.length;
    }

    getAllTypes(): string[] {
        const typesList = this.animals.map(animal => animal.type);
        return this.getUniqueValues(typesList);
    }

    getSpecificRaceList(kindName: string): string[] {
        const racesList: string[] = this.animals
            .filter(animal => animal.kind === kindName)
            .map(filteredAnimal => filteredAnimal.race)

        return this.getUniqueValues(racesList);
    }

    getAverageWeightOfSpecificRace(raceName: string): number {
        let weightsList: number[] = this.animals
            .filter(animal => animal.race === raceName)
            .map(filteredAnimal => filteredAnimal.weight)

        return this.getAverage(weightsList);
    }

    calculateLegsOfAllAnimals(): number {
        let chickensList: object[] = [];
        let cowsAndPigsList: object[] = [];

        this.animals.forEach(animal => {
            switch (animal.kind) {
                case 'chicken':
                    chickensList.push(animal);
                    break;
                case 'krowa' || '??winia':
                    cowsAndPigsList.push(animal);
                    break;
                default:
                    return [];
            }
        })

        return (chickensList.length * 2) + (cowsAndPigsList.length * 4);
    }

    calculateLegsOfSpecificKind(kindName: string): number {
        let chosenKindList: object[] = this.animals
            .filter(animal => animal.kind === kindName)
            .map(filteredAnimal => filteredAnimal)

        switch (kindName) {
            case 'chicken':
                return chosenKindList.length * 2;
            case 'krowa' || '??winia':
                return chosenKindList.length * 4;
            default:
                return;
        }
    }

    getMaleFemaleRatio(typeName: string): number {
        let malesList: object[] = [];
        let femalesList: object[] = [];

        this.animals.forEach(animal => {
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
        let agesList = this.animals.map(animal => animal.age);
        return this.getAverage(agesList);
    }

    getMetanProductionInGivenNumsOfYears(givenNumOfYears: number): number {
        let metanProductionList: Unit[] = [];

        Object.values(this.animals).forEach(item => {
            for (let value in item) {
                metanProductionList.push(item[value].metanProductionPerDay);
            }
        })

        let formattedMetanProductionValue = metanProductionList.map(item =>
            item.unit === 'g' ? item.value / 1000 : item.value
        )

        return this.getSum(formattedMetanProductionValue) * givenNumOfYears;
    }
}
const animalsManager = new AnimalsManager(data, metaData);
console.log(animalsManager.animals)

// 	1. Wy??wietl wszystkie rodzaje zwierz??t 

// 	2. Wy??wietl wszystkie wyst??puj??ce rasy zwierz??t z danego rodzaju (u??ytkownik ma mie?? mo??liwo???? podania rodzaju) 

// 	3. Wylicz ??redni?? wag?? zwierz??t danej rasy 

// 	4. Wylicz ??redni?? d??ugo???? ??ycia danej rasy **

// 	5. Policz ????czn?? liczb?? ko??czyn (pomijaj??c skrzyd??a) zwierz??t

// 	6. Policz ????czn?? liczb?? ko??czyn danego rodzaju zwierz??t 

// 	7. Policz stosunek liczby samc??w do samic dla danego rodzaju zwierz??t

// 	8. Ile metanu wytworz?? zwierz??ta przez X lat ??ycia

// 	9. Podaj ??redni wiek zwierz??t

class ChickenItem extends Animal implements IChickenMetaData {
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

// 	1. Ile jaj dziennie dadz?? kury nioski

// 	2. Ile jaj dziennie dadz?? kury mi??sne

// 	3. Kt??ra ilo???? jaj b??dzie wi??ksza

// 	4. Ile kg karmy potrzeba by wykarmi?? wszystkie kury w ci??gu dnia

// 	5. Ile jest obecnych piskl??t.

// 	6. Jaki jest stosunek samc??w do samic piskl??t

// 	7. Jaka jest ????czna waga wszystkich kur samic

// 	8. Jaka jest ??rednia waga wszystkich kur

// 	9. Jaka jest ??rednia waga kur niosek
// function getAverageWeightOfNioski(arr) {
//     let weightsList = [];
//     arr.forEach(animal => animal.type === 'nioska' && weightsList.push(animal.weight));

//     return (weightsList.reduce((a, b) => a + b) / weightsList.length).toFixed(2);
// }

// 	10. Jaka jest ??rednia waga kur mi??snych
// function getAverageWeightOfMiesne(arr) {
//     let weightsList = [];
//     arr.forEach(animal => animal.type === 'mi??sna' && weightsList.push(animal.weight));

//     return (weightsList.reduce((a, b) => a + b) / weightsList.length).toFixed(2);
// }

// 	11. ??redni wiek kur wzgl??dem typu ('mi??sna' lub 'nioska', wybierane przez u??ytkownika)
// function getAverageWeightOfCertainChickenTypes(arr, chickenType) {
//     let totalWeight = 0;
//     const chickensList = arr.filter(animal => animal.type === chickenType && (totalWeight += animal.weight))

//     return (totalWeight / chickensList.length).toFixed(2);
// }



// 	1. Policz ile mleka dadz?? krowy mleczne przez dzie??

// 	2. Ile kg karmy potrzeba, by wykarmi?? wszystkie krowy

// 	3. Jaki jest stosunek byk??w do kr??w?

// 	4. Ile metanu wytworz?? krowy przez X lat ??ycia

// 	5. Ile jest sutk??w (1 krowa ma 4 sutki) w??r??d kr??w

// 	6. Jaka jest ????czna waga byk??w

// 	7. Jaka jest ????czna waga kr??w

// 	8. Jaka jest ????czna waga kr??w mi??snych

// 	9. Czy jest wystarczaj??ca liczba byk??w, tak by ka??dy byk m??g?? pokry?? 2 krowy? Je??eli nie, zwr???? informacj??, kt??rych zwierz??t jest za ma??o.

// 	10. ??redni wiek kr??w wzgl??dem typu ('mi??sna' lub 'nioska', wybierane przez u??ytkownika)
// function averagCowsAge(arr, cowType) {
//     const weightsArr = [];
//     const cowsList = arr.filter(animal => animal.type === cowType && weightsArr.push(animal.weight));

//     return (weightsArr.reduce((a, b) => a + b) / cowsList.length).toFixed(2);
// }



// 	1. Ile jest ??wi?? w gospodarstwie

// 	2. Ile odn????y posiadaj?? ????cznie wszystkie ??winie

// 	3. Ile metanu wytworz?? ??winie przez X lat ??ycia

// 	4. Jaka jest ????czna waga macior

// 	5. Ile ??wi?? nie osi??gne??o dojrza??o??ci p??ciowej

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