// og colours
/*{"primaryClr": "#aeaeae"}
{"secondaryClr": "#303030"}*/

var root = document.querySelector(':root');
let colorsChanged = true;

function setColors () {
    chrome.storage.local.get(["primaryClr"]).then((result) => {
        root.style.setProperty('--primaryClr', result.primaryClr)
    });

    chrome.storage.local.get(["secondaryClr"]).then((result) => {
        root.style.setProperty('--secondaryClr', result.secondaryClr)
    });
}

function setBg () {
    chrome.storage.local.get(["bgImage"]).then((result) => {
        if(result.bgImage != null || result.bgImage != undefined)
            root.style.setProperty('--bg', result.bgImage)
        else
            root.style.setProperty('--bg', 'url("/resources/background.png")')
    });
}

setInterval(setColors, 100);
setInterval(setBg, 100);
