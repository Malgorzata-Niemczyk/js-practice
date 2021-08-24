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