setTimeout(()=>{document.body.style.setProperty('opacity','100%');
document.body.style.setProperty('background-color','#090909');}, 100)

var online = window.navigator.onLine;
let noOfShortcuts = 0;
let shortcuts = [];

window.addEventListener("online", function() {
    online = true;
})
  
window.addEventListener("offline", function() {
    online = false;
})


async function isUrlValid(string) {
    try {
      new URL(string);
      return true;
    } 
    catch (err) {
      return false;
    }
}


chrome.storage.local.get(["shortcuts"]).then((result) => { 
    result = result.shortcuts
    if (result['drawer'] == true) {
        document.getElementById("shortcutDrawerCheck").checked = true;
    }

    shortcuts = result['links'];
    noOfShortcuts = shortcuts.length;
    if(noOfShortcuts != 0)
        document.getElementById("shortcuts").innerHTML = ""
    for(let i = 0;i<noOfShortcuts;i++) {
        let shortcut = document.createElement("div");
        shortcut.setAttribute("style","display:inline-block; width:46vw;");

        let shortcutItemName = document.createElement("input");
        shortcutItemName.setAttribute("type","url");
        shortcutItemName.setAttribute("id","shortcutItemName"+i);
        shortcutItemName.setAttribute("placeholder","Name");
        shortcutItemName.setAttribute("class","shortcutItem");
        shortcutItemName.setAttribute("style","margin-bottom: 0; border: 1px solid #696969; border-bottom: 0px; border-bottom: 1px solid rgba(255, 255, 255, 0.21); border-radius:10px 10px 0 0;display:inline-block; width:50vw; margin-left: 5vw;");
        shortcutItemName.value = shortcuts[i]['name'];

        let shortcutItem = document.createElement("input");
        shortcutItem.setAttribute("type","url");
        shortcutItem.setAttribute("id","shortcutItem"+i);
        shortcutItem.setAttribute("placeholder","URL");
        shortcutItem.setAttribute("class","shortcutItem");
        shortcutItem.setAttribute("style","margin-top: 0; border: 1px solid #696969; border-top: 0px; border-radius:0 0 10px 10px;display:inline-block;width:50vw; margin-left: 5vw");
        shortcutItem.value = shortcuts[i]['url'];

        shortcut.appendChild(shortcutItemName);
        shortcut.appendChild(shortcutItem);

        let deleteButton = document.createElement("button");
        let icon = document.createElement("span");
        icon.setAttribute("class","material-symbols-outlined");
        icon.innerHTML = "delete";
        
        deleteButton.setAttribute("class","iconButton");
        deleteButton.setAttribute("style","margin-left: 18vw;");
        deleteButton.setAttribute("id","shortcut"+i);
        deleteButton.appendChild(icon);
        
        document.getElementById("shortcuts").appendChild(shortcut);
        document.getElementById("shortcuts").appendChild(deleteButton);
        document.getElementById("shortcut"+i).addEventListener('click', function() { console.log(shortcuts[i]); shortcuts.splice(i,1); result['links'] = shortcuts; chrome.storage.local.set({"shortcuts":result}); location.reload(); })
    }
});


document.getElementById("addShortcut").addEventListener('click', function() { addShortcutAddr(); location.reload(); })


document.getElementById("applyBtS").addEventListener('click', function() 
{
    chrome.storage.local.get(["shortcuts"]).then((result) => { 
        result = result.shortcuts['links'];
        for(let i = 0;i<result.length;i++) {
            let shortcut = document.getElementById("shortcutItem"+i).value;
            let shortcutName = document.getElementById("shortcutItemName"+i).value;
            if(result[i]['url'] != shortcut) {
                result[i]['url'] = shortcut;
                var icon = new URL(chrome.runtime.getURL("/_favicon/"))
                icon.searchParams.set("pageUrl",result[i]['url']);
                icon.searchParams.set("size","16")
                result[i]['icon'] = icon.toString();
            }
            if(result[i]['name'] != shortcutName)
                result[i]['name'] = shortcutName;
        }
        chrome.storage.local.set({"shortcuts":{"drawer":document.getElementById("shortcutDrawerCheck").checked,"links":result}});
    });
    document.getElementById("applyBtS").innerHTML = "Applied"; setTimeout(() => { document.getElementById("applyBtS").innerHTML = "Apply"; }, 1000)
})


async function addShortcutAddr() {
    var name = (document.getElementById("shortcutName").value);
    var address = (document.getElementById("shortcutAddr").value).toLowerCase();
    var icon = null;
    if(online) {
        icon = new URL(chrome.runtime.getURL("/_favicon/"))
        icon.searchParams.set("pageUrl",address);
        icon.searchParams.set("size","16")
        icon = icon.toString()
    }
    if(await isUrlValid(address) == true)
        chrome.storage.local.get(["shortcuts"]).then((result) => { 
            result = result.shortcuts;
            var shortcut = {'name':name,'url':address,'icon':icon}; 
            result['links'].push(shortcut);
            chrome.storage.local.set({"shortcuts":result})
        });
    else
        var textField = document.getElementById("shortcutAddr");
        textField.value = "";
        textField.placeholder = "Invalid URL";
}