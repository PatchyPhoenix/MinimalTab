var x, y;
var boxPos = 80;
var flag = 0;
var flagS = 0;


window.addEventListener("online", function() {
    online = true;
})
  
window.addEventListener("offline", function() {
    online = false;
})

document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);


function onMouseUpdate(e) {
    y = e.pageY;
    x = e.pageX;
}


function clearBox() {
    document.getElementById("box").innerHTML = ""
}


function addShortcutsToBox() {
    clearBox();
    var boxDiv = document.getElementById("box");
    chrome.storage.local.get(["shortcuts"]).then((result) => { 
        drawer = result.shortcuts['drawer']
        result = result.shortcuts['links'];
        if (result.length != 0)
            for(var i = 0;i < result.length;i++) {
                var shortcut = document.createElement("div");
                shortcut.setAttribute('style',"max-width:10vw; display:inline-block;")
                var link = document.createElement('a');
                var name = document.createElement('div');
                name.setAttribute("style","margin-top:1.5vw; font-family:FiraRegular;")
                name.innerText = result[i]['name']
                var image = document.createElement("img");
                if(result[i]['icon'] != null || result[i]['icon'] != undefined) {
                    image.setAttribute('src',result[i]['icon']);
                    link.appendChild(image);
                }
                else {
                    if(online) {
                        const url = new URL(chrome.runtime.getURL("/_favicon/"))
                        url.searchParams.set("pageUrl",result[i]['url']);
                        url.searchParams.set("size","16");
                        result[i]['icon'] = url.toString();
                        image.setAttribute('src',result[i]['icon']);
                        link.appendChild(image);
                    }
                    else {
                        var icon = document.createElement("span");
                        icon.setAttribute('class',"material-symbols-outlined");
                        icon.setAttribute('style',"font-size:1.3vw;");
                        icon.innerText = "globe";
                        link.appendChild(icon);
                    }
                }
                link.setAttribute("href",result[i]['url']);
                link.setAttribute("class","button");
                shortcut.appendChild(link);
                shortcut.appendChild(name);
                boxDiv.appendChild(shortcut);
                chrome.storage.local.set({"shortcuts":{"drawer":drawer,'links':result}})
            } 
        else {
            var shortcut = document.createElement("div");
            shortcut.setAttribute('style',"max-width:10vw; display:inline-block;")
            var link = document.createElement('a');
            link.setAttribute("href","https://google.com");
            link.setAttribute("class","button");
            var name = document.createElement('div');
            name.setAttribute("style","margin-top:1.5vw; font-family:FiraRegular;")
            name.innerText = "Google"
            
            var image = document.createElement("img");
            chrome.storage.local.get(["googleIcon"]).then((result) => {
                if(result.googleIcon != null || result.googleIcon != undefined) {
                    image.setAttribute('src', result.googleIcon)
                    link.appendChild(image);
                }
                else {
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
                        link.appendChild(icon);
                    }
                }
            });
            }
            
            shortcut.appendChild(link);
            shortcut.appendChild(name);
            boxDiv.appendChild(shortcut);
        }
    );
}

async function handleSitesBar() {
    chrome.storage.local.get(["shortcuts"]).then((result) => { 
        if (result.shortcuts['drawer']) { 
            if((document.getElementById("widgetsPanel").style.transform == "translateX(-12.5%)")){
                if ((y >= (window.innerHeight * 60 / 100) && (x >= (window.innerWidth * 30 / 100)))) {
                    flag = 1;
                    document.getElementById("box").style.transform = "translatey(-12.5%)";
                    if(flagS != 1 && boxPos >= 1){
                        addShortcutsToBox();
                        flagS = 1;
                    }
                }
                else {
                    flag = 0;
                    document.getElementById("box").style.transform = "translatey(100%)";
                    if(boxPos <= 80 && flagS == 1)
                        flagS = 0;
                }
            }
            else {
                if (y >= (window.innerHeight * 60 / 100)) {
                    flag = 1;
                    document.getElementById("box").style.transform = "translatey(-12.5%)";
                    if(flagS != 1 && boxPos >= 1){
                        addShortcutsToBox();
                        flagS = 1;
                    }
                }
                else {
                    flag = 0;
                    document.getElementById("box").style.transform = "translatey(100%)";
                    if(boxPos <= 80 && flagS == 1)
                        flagS = 0;
                }
            }
        } 
    })
}


addShortcutsToBox();
setInterval(handleSitesBar, 250);