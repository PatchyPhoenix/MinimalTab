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

function clearBox() {
    var boxDiv = document.getElementById("box");
    boxDiv.innerHTML = ""
}

function addShortcutsToBox() {
    clearBox();
    var boxDiv = document.getElementById("box");
    chrome.storage.local.get(["shortcuts"]).then((result) => { 
        result = result.shortcuts;
        if (result.length != 0)
            for(var i = 0;i < result.length;i++) {
                var shortcut = document.createElement("div");
                shortcut.setAttribute('style',"max-width:10vw; display:inline-block;")
                var link = document.createElement('a');
                var name = document.createElement('div');
                name.setAttribute("style","margin-top:1.5vw; font-family:FiraExtraLight;")
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
                chrome.storage.local.set({"shortcuts":result})
            } 
        else {
            var shortcut = document.createElement("div");
            shortcut.setAttribute('style',"max-width:10vw; display:inline-block;")
            var link = document.createElement('a');
            link.setAttribute("href","https://google.com");
            link.setAttribute("class","button");
            var name = document.createElement('div');
            name.setAttribute("style","margin-top:1.5vw; font-family:FiraExtraLight;text-shadow:.2vw .2vw rgba(0,0,0,.8);")
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

// deprecated
// function shortcuts () {
//     var boxDiv = document.getElementById("box");
//     chrome.storage.local.get(["shortcuts"]).then((result) => { 
//         result = result.shortcuts;
//         if (result.length != 0)
//             for(var i = 0;i < result.length;i++) {
//                 var shortcut = document.createElement("div");
//                 shortcut.setAttribute('style',"max-width:10vw; display:inline-block;")
//                 var link = document.createElement('a');
//                 var name = document.createElement('div');
//                 name.setAttribute("style","margin-top:1.5vw; font-family:FiraExtraLight;")
//                 name.innerText = result[i]['name']
//                 var image = document.createElement("img");
//                 if(online)
//                     image.setAttribute('src',("https://s2.googleusercontent.com/s2/favicons?domain=" + result[i]['url']));
//                 image.setAttribute('alt',"");
//                 link.setAttribute("href",result[i]['url']);
//                 link.setAttribute("class","button");
//                 link.appendChild(image);
//                 shortcut.appendChild(link);
//                 shortcut.appendChild(name);
//                 boxDiv.appendChild(shortcut);
//             } 
//         else {
//             var shortcut = document.createElement("div");
//             shortcut.setAttribute('style',"max-width:10vw; display:inline-block;")
//             var link = document.createElement('a');
//             link.setAttribute("href","https://google.com");
//             link.setAttribute("class","button");
//             var name = document.createElement('div');
//             name.setAttribute("style","margin-top:1.5vw; font-family:FiraExtraLight;")
//             name.innerText = "Google"
//             if(online) {
//                 var image = document.createElement("img");
//                 image.setAttribute('src',("https://s2.googleusercontent.com/s2/favicons?domain=https://google.com"));
//                 link.appendChild(image);   
//             }
//             else {
//                 var icon = document.createElement("span");
//                 icon.setAttribute('class',"material-symbols-outlined");
//                 icon.setAttribute('style',"font-size:1.3vw;");
//                 icon.innerText = "globe" 
//                 link.appendChild(icon);   
//             }
//             shortcut.appendChild(link);
//             shortcut.appendChild(name);
//             boxDiv.appendChild(shortcut);
//         }
//     });
// }

document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);

function onMouseUpdate(e) {
    x = e.pageX;
    y = e.pageY;
}


// bug - excess shortcuts are spawned ( seems to be better )
function handleSitesBar() {
    chrome.storage.local.get(["shortcutDrawer"]).then((result) => { 
        if (result.shortcutDrawer) { 
            if (y >= (screen.height * 56 / 100)) {
                flag = 1;
            }
            else {
                flag = 0;
            }
        } 
    })
    
    function closeBar () {
        if (flag == 0) {
            if(boxPos < 105) {
                document.getElementById("box").style.transform = "translatey("+boxPos+"%)";
                boxPos += boxPos * 20 / 100;
            }
            if(boxPos <= 80 && flagS == 1)
                flagS = 0;
        }
    }

    function openBar () {
        if (flag == 1 && boxPos > 1) {
            document.getElementById("box").style.transform = "translatey("+boxPos+"%)";
            boxPos -= boxPos * 20 / 100;
            if(flagS != 1 && boxPos >= 1){
                addShortcutsToBox();
                flagS = 1;
            }
        }
    }

    openBar();
    closeBar();
}

addShortcutsToBox();
setInterval(handleSitesBar,10);