var op = 0;
var tr = -15

function fadeIn (element) {    
    if (op < 110) {
        element.style.opacity = op + "%";
        op += 15;
    }
    else {
        console.log("Done - Fade");
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