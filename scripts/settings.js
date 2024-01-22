chrome.storage.local.get(["primaryClr"]).then((result) => {
    document.getElementById("primaryClr").value = result.primaryClr;
});

chrome.storage.local.get(["secondaryClr"]).then((result) => {
    document.getElementById("secondaryClr").value = result.secondaryClr;
});

document.getElementById("resetBt").addEventListener('click', function() { 
    reset();
    location.reload(); 
})

document.getElementById("applyBt").addEventListener('click', function() { 
    apply();
    document.getElementById("applyBt").innerHTML = "Applied";
    setTimeout(() => { document.getElementById("applyBt").innerHTML = "Apply"; }, 1000)
})

function apply () { 
    chrome.storage.local.get(["secondaryClr"]).then((result) => { 
        if (document.getElementById("secondaryClr").value != result) {
          chrome.storage.local.set({"secondaryClr":document.getElementById("secondaryClr").value}) 
        } 
      })

    chrome.storage.local.get(["primaryClr"]).then((result) => { 
        if (document.getElementById("primaryClr").value != result) {
          chrome.storage.local.set({"primaryClr":document.getElementById("primaryClr").value}) 
        } 
      })
}

function reset () {
    chrome.storage.local.set({"primaryClr":"#BEBEBE",
      "secondaryClr":"#BEBEBE",
      "shortcutDrawer":true,
      "shortcuts":[],
      "bgImage":null,
    "widgets":{"weather":{"condition":null, "lastUpdatedWeather":0,"location":null,"status":true}}});
}