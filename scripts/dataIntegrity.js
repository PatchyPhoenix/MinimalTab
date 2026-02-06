var online = window.navigator.onLine;

window.addEventListener("online", function() {
    online = true;
})
  
window.addEventListener("offline", function() {
    online = false;
})


async function handleMissingData() {
    chrome.storage.local.get(["colours"]).then((result) => { 
        if (result.colours == null || result.colours == undefined) { 
            chrome.storage.local.set({"colours": {"primary":"#BEBEBE","secondary":"#BEBEBE"}}); 
            console.log("filling in the gaps - clr") 
        }
    })

    chrome.storage.local.get(["background"]).then((result) => { 
        if (result.background == null || result.background == undefined) { 
            chrome.storage.local.set({"background": {"type":'colour',"src":"#0F0F0F"}}); 
            console.log("filling in the gaps - bg") 
        } 
    })
    
    chrome.storage.local.get(["shortcuts"]).then((result) => { 
        if (result.shortcuts == null || result.shortcuts == undefined) { 
            chrome.storage.local.set({"shortcuts": {'drawer':true,"links":[]}}); 
            console.log("filling in the gaps - s") 
        }  
    })
    
    chrome.storage.local.get(["widgets"]).then((result) => { 
        if (result.widgets == null || result.widgets == undefined) { 
            chrome.storage.local.set({"widgets": {'weather':{'status':true,"location":null, 'condition':null, "lastUpdatedWeather":0}, "search":{"status":false, 'searchEngine':"google"}}});
            console.log("filling in the gaps - w") 
        } 
        else if(result.widgets.weather == null || result.widgets.weather == undefined) {
            result.widgets.weather = {'status':true,"location":null, 'condition':null, "lastUpdatedWeather":0}
            chrome.storage.local.set({"widgets": result.widgets});
            console.log("filling in the gaps - w") 
        }
        else if(result.widgets.search == null || result.widgets.search == undefined) {
            result.widgets.search = {"status":false, 'searchEngine':"google"};
            chrome.storage.local.set({"widgets": result.widgets});
            console.log("filling in the gaps - w")
        }
        else if(result.widgets.news == null || result.widgets.news == undefined) {
            result.widgets.news = {"categories":[], 'articles':{}};
            chrome.storage.local.set({"widgets": result.widgets});
            console.log("filling in the gaps - w")
        }
        else if(result.widgets.panel == null || result.widgets.panel == undefined) {
            result.widgets.panel = true;
            chrome.storage.local.set({"widgets": result.widgets});
            console.log("filling in the gaps - w")
        }
    })
    
    chrome.storage.local.get(["googleIcon"]).then((result) => {
        if(result.googleIcon == null || result.googleIcon == undefined) {
            if(online) {
                const url = new URL(chrome.runtime.getURL("/_favicon/"))
                url.searchParams.set("pageUrl","https://www.google.com");
                url.searchParams.set("size","16")
                chrome.storage.local.set({"googleIcon":url.toString()})
            }

            else {
                var icon = document.createElement("span");
                icon.setAttribute('class',"material-symbols-outlined");
                icon.setAttribute('style',"font-size:1.3vw;");
                icon.innerText = "globe";
            }
            console.log("filling in the gaps - g")
        }
    })

    chrome.storage.local.get(["alwaysOnSettingsButton"]).then((result) => {
        if(result.alwaysOnSettingsButton == null || result.alwaysOnSettingsButton == undefined)
            chrome.storage.local.set({"alwaysOnSettingsButton":true})
    })
}

handleMissingData();
setInterval(handleMissingData, 300)