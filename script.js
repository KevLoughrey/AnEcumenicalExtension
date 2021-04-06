var _URL = `https://api.fatherted.irish/quotes/random`;
var _COUNTER_TARGET_ELEMENT = document.getElementById("counter");
var _QUOTE_TARGET_ELEMENT = document.getElementById("quote");

fetch(_URL)
    .then(response => response.json())
    .then(function (data) {
        _QUOTE_TARGET_ELEMENT.innerHTML = parseData(data);
        updateCounter();
    });

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

    let episode = obj.episode;
    finalHTMLString += `<p class="credit">—${episode}</p>`;

    return finalHTMLString;
}

function updateCounter() {
    chrome.storage.sync.get('frtedcount', function (data) {
        if (typeof data.frtedcount === 'undefined') {
            chrome.storage.sync.set({ frtedcount: 1 });
            _COUNTER_TARGET_ELEMENT.innerHTML = `You have generated 1 Father Ted quote.<br>God bless you.`;
        } else {
            chrome.storage.sync.set({ frtedcount: data.frtedcount + 1 });
            _COUNTER_TARGET_ELEMENT.innerHTML = `You have generated ${data.frtedcount} Father Ted quotes.<br>God bless you.`;
        }
    });
}