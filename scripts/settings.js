setTimeout(()=>{document.body.style.setProperty('opacity','100%');
document.body.style.setProperty('background-color','#090909');}, 100)

document.getElementById("resetBt").addEventListener('click', function() { 
    reset();
    location.reload(); 
})

async function reset () {
    chrome.storage.local.set({
        "colours":{"primary":"#BEBEBE", "secondary":"#BEBEBE"},
        "alwaysOnSettingsButton":true,
        "shortcuts":{"drawer":true,"links":[]},
        "background":{"type":"colour","src":"#090909"},
        "widgets":{"weather":{"condition":null, "lastUpdatedWeather":0,"location":null,"status":false}, "search":{'status':false,"searchEngine":"google"}}});
}