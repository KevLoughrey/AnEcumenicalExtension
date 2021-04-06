var _URL = `https://api.fatherted.irish/quotes/random`;
var _TARGET_ELEMENT = document.getElementById("dynamic");

fetch(_URL)
    .then(response => response.json())
    .then(data => _TARGET_ELEMENT.innerHTML = parseData(data));

function parseData(obj) {
    return obj.quote;
}