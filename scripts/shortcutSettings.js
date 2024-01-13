function handleMissingData() {
    chrome.storage.local.get(["primaryClr"]).then((result) => { if (result.primaryClr == null || result.primaryClr == undefined) { chrome.storage.local.set({"primaryClr": "#BEBEBE"}); console.log("filling in the gaps - pclr") } })
    chrome.storage.local.get(["secondaryClr"]).then((result) => { if (result.secondaryClr == null || result.secondaryClr == undefined) { chrome.storage.local.set({"secondaryClr": "#BEBEBE"}); console.log("filling in the gaps - sclr") } })
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

handleMissingData();
setInterval(handleMissingData, 100)

let noOfShortcuts = 0;
let shortcuts = [];

chrome.storage.local.get(["shortcutDrawer"]).then((result) => { 
    if (result.shortcutDrawer == true) {
        document.getElementById("shortcutDrawerCheck").checked = true;
    }
});


chrome.storage.local.get(["shortcuts"]).then((result) => { 
    shortcuts = result.shortcuts;
    noOfShortcuts = shortcuts.length;
    for(let i = 0;i<noOfShortcuts;i++) {
        let shortcut = document.createElement("div");
        shortcut.setAttribute("style","display:inline-block; width:46vw;");

        let shortcutItemName = document.createElement("input");
        shortcutItemName.setAttribute("type","url");
        shortcutItemName.setAttribute("id","shortcutItemName"+i);
        shortcutItemName.setAttribute("placeholder","Name");
        shortcutItemName.setAttribute("class","shortcutItem");
        shortcutItemName.setAttribute("style","margin-bottom: 0; border-bottom: 1px solid rgba(255, 255, 255, 0.21); border-radius:10px 10px 0 0;display:inline-block;width:40vw;");
        shortcutItemName.value = shortcuts[i]['name'];

        let shortcutItem = document.createElement("input");
        shortcutItem.setAttribute("type","url");
        shortcutItem.setAttribute("id","shortcutItem"+i);
        shortcutItem.setAttribute("placeholder","URL");
        shortcutItem.setAttribute("class","shortcutItem");
        shortcutItem.setAttribute("style","margin-top: 0; border-radius:0 0 10px 10px;display:inline-block;width:40vw;");
        shortcutItem.value = shortcuts[i]['url'];

        shortcut.appendChild(shortcutItemName);
        shortcut.appendChild(shortcutItem);

        let deleteButton = document.createElement("button");
        let icon = document.createElement("span");
        icon.setAttribute("class","material-symbols-outlined");
        icon.innerHTML = "delete";
        
        deleteButton.setAttribute("class","iconButton");
        deleteButton.setAttribute("id","shortcut"+i);
        deleteButton.appendChild(icon);
        
        document.getElementById("shortcuts").appendChild(shortcut);
        document.getElementById("shortcuts").appendChild(deleteButton);
        document.getElementById("shortcut"+i).addEventListener('click', function() { console.log(shortcuts[i]); shortcuts.splice(i,1);chrome.storage.local.set({"shortcuts":shortcuts}); location.reload(); })
    }
});


document.getElementById("addShortcut").addEventListener('click', function() { addShortcutAddr(); location.reload(); })

document.getElementById("applyBtS").addEventListener('click', function() 
{
    chrome.storage.local.set({"shortcutDrawer":document.getElementById("shortcutDrawerCheck").checked});
    chrome.storage.local.get(["shortcuts"]).then((result) => { 
        result = result.shortcuts;
        for(let i = 0;i<result.length;i++) {
            let shortcut = document.getElementById("shortcutItem"+i).value;
            let shortcutName = document.getElementById("shortcutItemName"+i).value;
            if(result[i]['url'] != shortcut) 
                result[i]['url'] = shortcut;
            if(result[i]['name'] != shortcutName)
                result[i]['name'] = shortcutName;
        }
        chrome.storage.local.set({"shortcuts":result});
    });
    document.getElementById("applyBtS").innerHTML = "Applied"; setTimeout(() => { document.getElementById("applyBtS").innerHTML = "Apply"; }, 1000)
})

function addShortcutAddr() {
    var name = (document.getElementById("shortcutName").value);
    var address = (document.getElementById("shortcutAddr").value).toLowerCase();
    if(isUrlValid(address) == true)
        chrome.storage.local.get(["shortcuts"]).then((result) => { result = result.shortcuts; var shortcut = {'name':name,'url':address} ;result.push(shortcut); chrome.storage.local.set({"shortcuts":result})});
    else
        var textField = document.getElementById("shortcutAddr");
        textField.value = "";
        textField.placeholder = "Invalid URL";
}