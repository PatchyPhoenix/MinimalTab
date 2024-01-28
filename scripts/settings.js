document.getElementById("resetBt").addEventListener('click', function() { 
    reset();
    location.reload(); 
})

async function reset () {
    chrome.storage.local.set({"colours":{"primary":"#BEBEBE", "secondary":"#BEBEBE"},
      "shortcuts":{"drawer":true,"links":[]},
      "background":{"type":"colour","src":"#000000"},
      "widgets":{"weather":{"condition":null, "lastUpdatedWeather":0,"location":null,"status":true}}});
}