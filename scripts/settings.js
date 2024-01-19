function handleMissingData() {
  chrome.storage.local.get(["primaryClr"]).then((result) => { 
      if (result.primaryClr == null || result.primaryClr == undefined) { 
          chrome.storage.local.set({"primaryClr": "#BEBEBE"}); 
          console.log("filling in the gaps - pclr") 
      } 
  })
  chrome.storage.local.get(["secondaryClr"]).then((result) => { 
      if (result.secondaryClr == null || result.secondaryClr == undefined) { 
          chrome.storage.local.set({"secondaryClr": "#BEBEBE"}); 
          console.log("filling in the gaps - sclr") 
      } 
  })
  chrome.storage.local.get(["shortcutDrawer"]).then((result) => { 
      if (result.shortcutDrawer == null || result.shortcutDrawer == undefined) { 
          chrome.storage.local.set({"shortcutDrawer": true}); 
          console.log("filling in the gaps - sd") 
      } 
  })
  chrome.storage.local.get(["shortcuts"]).then((result) => { 
      if (result.shortcuts == null || result.shortcuts == undefined) { 
          chrome.storage.local.set({"shortcuts": []}); 
          console.log("filling in the gaps - s") 
      }  
  })
  chrome.storage.local.get(["widgets"]).then((result) => { 
      if (result.widgets == null || result.widgets == undefined) { 
          chrome.storage.local.set({"widgets": {'weather':{'status':true,"location":null, 'condition':null, "lastUpdatedWeather":0}}});
          console.log("filling in the gaps - w") 
      } 
      else if(result.widgets.weather == null || result.widgets.weather == undefined) {
          result.widgets.weather = {'status':true,"location":null, 'condition':null, "lastUpdatedWeather":0}
          chrome.storage.local.set({"widgets": result.widgets});
          console.log("filling in the gaps - w") 
      }
  })
}

handleMissingData();
setInterval(handleMissingData, 100)

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