var _URL = `https://api.fatherted.irish/quotes/random`;
var _TARGET_ELEMENT = document.getElementById("dynamic");

fetch(_URL)
    .then(response => response.json())
    .then(data => _TARGET_ELEMENT.innerHTML = parseData(data));

function parseData(obj) {
    let quote = obj.quote;
    let characters = obj.characters;

    // convert speaker names to bold 
    for (let i = 0; i < characters.length; i++) {
        quote = quote.replaceAll(`${characters[i]}:`, `<span class="bold">${characters[i]}:</span>`)
    }

    split_quote = quote.split('\n');
    let finalHTMLString = "";
    // make a new paragraph element for each dialogue line 
    for (let i = 0; i < split_quote.length; i++) {
        finalHTMLString += `<p>${split_quote[i]}</p>`;
    }

    return finalHTMLString;
}