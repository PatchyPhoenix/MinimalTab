document.getElementById("resetBt").addEventListener('click', function() { 
    reset();
    location.reload(); 
})

async function reset () {
    chrome.storage.local.set({"colours":{"primary":"#BEBEBE", "secondary":"#BEBEBE"},
      "shortcuts":{"drawer":true,"links":[]},
      "background":{"type":"colour","src":"#0F0F0F"},
      "widgets":{"weather":{"condition":null, "lastUpdatedWeather":0,"location":null,"status":true}}});
}