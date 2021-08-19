const url = './books.json';

let requestURL = new XMLHttpRequest();
requestURL.open('GET', url);
requestURL.responseType = 'json';
requestURL.send();

requestURL.onload = () => {
    const books = requestURL.response;
}