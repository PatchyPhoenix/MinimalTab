
//chrome.tabs.create({url:"index.html"});

chrome.tabs.onCreated.addListener(async function(tab) {
    if(tab['pendingUrl'] == "chrome://startpageshared/") {
        chrome.tabs.remove(tab['id'])
        chrome.tabs.create({url:"index.html"});
    }
});