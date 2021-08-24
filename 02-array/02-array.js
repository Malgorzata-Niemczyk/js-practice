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
})


// Napisz metody, które:

// 	1. Zwracającą listę unikalnych nazw krajów w których żyli ludzie.

// 	2. Zwracającą listę unikalnych nazw krajów w których ludzie żyją aktualnie.

// 	3. Zwracającą liczbę aktualnie mieszkających ludzi w danym kraju.

// 	4. Zwracającą listę krajów w których żyję więcej lub mniej ludzi niż X

// 	5. Zwracającą imiona, osób pracująćych w największej lub najmniejszej firmie w danym czasie.

// 	6. Zwracającą firmę, która płaci w sumie najwięcej lub najmniej swoim pracownikom.

// 	7. Zwracającą średnie wynagrodzenie pracownika w danej firmie.

// 	8. Zwracającą osoby, które najwięcej o sobie opisały w polu description.

// 	9. Policz różne słowa wykorzystane w polu description.

// 	10. Które słowa powtarzał się najczęściej a które najrzadziej.

// 	11. Pogrupuj ludzi wg. zamieszkania (nazwa ulicy).

// 	12. Jakie numery domów najczęściej się potwarzały.

// 	13. Zwracającą ludzi, którzy mieli ciągłość pracy (tj. nie było ani jednego dnia przerwy pomiędzy pracami).

// 	14. W którym roku pracowało najwięcej ludzi a w którym najmniej.

// 	15. Informującą ile osób pracowało w danym roku.

// 	16. Sortującą ludzi wg imienia, nazwiska, kraj zamieszkania, bądź nazwy firmy dla której ostatnio pracowali bądź dalej pracują.

// 	17. Czy ktoś mieszka na tej samej ulicy, a jeżeli tak, to kto?

// 	18. Jakie zdanie/zdania były najdłuższe (description)?

// 	19. Jakie słowa mają liczbę znaków pomiędzy X a Y (description)?

// 	20. Które stany są najbardziej zaludnione, a które najmniej?