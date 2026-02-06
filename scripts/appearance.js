// og colours
/*{"primaryClr": "#aeaeae"}
{"secondaryClr": "#303030"}*/

import { setTime } from "./time.js";


var root = document.querySelector(':root');

var op = 0;
var tr = -15

async function setColors () {
    chrome.storage.local.get(["colours"]).then((result) => {
        root.style.setProperty('--primaryClr', result.colours['primary'])
        root.style.setProperty('--secondaryClr', result.colours['secondary'])
    });
}


async function setBg () {
    chrome.storage.local.get(["background"]).then((result) => {
        result = result.background
        if(result.type == "colour") {
            root.style.setProperty("--bg",result.src)
        }
        else if(result.type == "image"){
            //console.log("image")
            if(result.src != null || result.src != undefined)
                root.style.setProperty('--bg', result.src)
            else
                root.style.setProperty('--bg', 'url("/resources/background.png")')
        }
    });
}

function fadeIn (element) {  
    document.body.style.setProperty("display","block")  
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
    document.body.style.setProperty("display","block")  
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


setTime();

setColors();
setBg();

setInterval(setTime, 1000)

setInterval(setColors, 1000);
setInterval(setBg, 1000);