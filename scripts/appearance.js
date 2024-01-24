// og colours
/*{"primaryClr": "#aeaeae"}
{"secondaryClr": "#303030"}*/

var root = document.querySelector(':root');
let colorsChanged = true;

async function setColors () {
    chrome.storage.local.get(["primaryClr"]).then((result) => {
        root.style.setProperty('--primaryClr', result.primaryClr)
    });

    chrome.storage.local.get(["secondaryClr"]).then((result) => {
        root.style.setProperty('--secondaryClr', result.secondaryClr)
    });
}

async function setBg () {
    chrome.storage.local.get(["bgImage"]).then((result) => {
        if(result.bgImage != null || result.bgImage != undefined)
            root.style.setProperty('--bg', result.bgImage)
        else
            root.style.setProperty('--bg', 'url("/resources/background.png")')
    });
}

setColors();
setBg();

setInterval(setColors, 250);
setInterval(setBg, 250);

var op = 0;
var tr = -15

function fadeIn (element) {    
    if (op < 110) {
        element.style.opacity = op + "%";
        op += 15;
    }
    else {
        //console.log("Done - Fade");
        clearInterval(fadeInBg);
        fadeInBg = undefined;
    }
}

function moveIn (element) {
    if (tr > 0){
        //console.log("Done - Move");
        clearInterval(moveInTime);
        moveInTime = undefined;
    }
    else if (tr > -0.1){
        tr = 0;
        //console.log("Done - Move");
        clearInterval(moveInTime);
        moveInTime = undefined;
    }
    else if (tr < 0){
        element.style.transform = "translatey("+tr+"%"+")";
        tr += Math.abs(tr * 10 / 100);
    }
    else {
        //console.log("Done - Move");
        clearInterval(moveInTime);
        moveInTime = undefined;
    }
}

var fadeInBg = setInterval(fadeIn, 50, document.getElementById("bg"))
var moveInTime = setInterval(moveIn, 10, document.getElementById("Time"));