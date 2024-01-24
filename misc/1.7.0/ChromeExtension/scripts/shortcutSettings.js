function handleMissingData() {
    chrome.storage.local.get(["primaryClr"]).then((result) => { if (result.primaryClr == null || result.primaryClr == undefined) { chrome.storage.local.set({"primaryClr": "#aeaeae"}); console.log("filling in the gaps - pclr") } })
    chrome.storage.local.get(["secondaryClr"]).then((result) => { if (result.secondaryClr == null || result.secondaryClr == undefined) { chrome.storage.local.set({"secondaryClr": "#303030"}); console.log("filling in the gaps - sclr") } })
    chrome.storage.local.get(["shortcutDrawer"]).then((result) => { if (result.shortcutDrawer == null || result.shortcutDrawer == undefined) { chrome.storage.local.set({"shortcutDrawer": true}); console.log("filling in the gaps - sd") } })
    chrome.storage.local.get(["shortcuts"]).then((result) => { if (result.shortcuts == null || result.shortcuts == undefined) { chrome.storage.local.set({"shortcuts": []}); console.log("filling in the gaps - s") }  })
}

function isUrlValid(string) {
    try {
      new URL(string);
      return true;
    } 
    catch (err) {
      return false;
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

handleMissingData();
setInterval(handleMissingData, 100)
sleep(1000)

let noOfShortcuts = 0;
let shortcuts = [];

chrome.storage.local.get(["shortcuts"]).then((result) => { 
    shortcuts = result.shortcuts;
    noOfShortcuts = shortcuts.length;
    for(let i = 0;i<noOfShortcuts;i++) {
        let shortcutItem = document.createElement("input");
        shortcutItem.setAttribute("type","url");
        shortcutItem.setAttribute("id","shortcutItem"+i);
        shortcutItem.setAttribute("class","shortcutItem");
        shortcutItem.value = shortcuts[i];
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete"
        deleteButton.setAttribute("class","deleteShortcutButton");
        deleteButton.setAttribute("id","shortcut"+i);
        document.getElementById("shortcuts").appendChild(shortcutItem);
        document.getElementById("shortcuts").appendChild(deleteButton);
        document.getElementById("shortcuts").appendChild(document.createElement('br'));
        document.getElementById("shortcut"+i).addEventListener('click', function() { console.log(shortcuts[i]); shortcuts.splice(i,1);chrome.storage.local.set({"shortcuts":shortcuts}); location.reload(); })
    }
});

document.getElementById("addShortcut").addEventListener('click', function() { addShortcutAddr(); location.reload(); })

document.getElementById("applyBtS").addEventListener('click', function() 
{
    chrome.storage.local.get(["shortcuts"]).then((result) => { 
        result = result.shortcuts;
        for(let i = 0;i<result.length;i++) {
            let shortcut = document.getElementById("shortcutItem"+i).value;
            if(result[i] != shortcut) 
                result[i] = shortcut;
        }
        chrome.storage.local.set({"shortcuts":result});
    });
    
    location.reload();
})

function addShortcutAddr() {
    var address = (document.getElementById("shortcutAddr").value).toLowerCase();
    if(isUrlValid(address) == true)
        chrome.storage.local.get(["shortcuts"]).then((result) => { result = result.shortcuts; result.push(address); chrome.storage.local.set({"shortcuts":result})});
    else
        textField = document.getElementById("shortcutAddr");
        textField.value = "";
        textField.placeholder = "Invalid URL";
}