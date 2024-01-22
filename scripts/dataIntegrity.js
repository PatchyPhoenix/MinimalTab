// deprecated (PLANING TO BE REVIVED)
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

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

handleMissingData();
setInterval(handleMissingData, 300)