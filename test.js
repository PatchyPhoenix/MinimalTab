
//chrome.tabs.create({url:"index.html"});

chrome.tabs.onCreated.addListener(async function(tab) {
    console.log(tab)
    if(tab['pendingUrl'] == "chrome://startpageshared/") {
        await chrome.tabs.remove(tab['id'])
        await chrome.tabs.create({url:"index.html", index:tab['index'], windowId:tab['windowId']});
        console.log(tab);
    }
});