var x, y;
var boxPos = 80;

document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);

function setTime() {
    const d = new Date();
    const timeText = document.getElementById("Time");
    const dateText = document.getElementById("Date");
    var date = d.toDateString();
    var hours = d.getHours().toString();
    var minutes = d.getMinutes().toString();
    if (minutes.length == 1)
        minutes = "0" + minutes;
    if (hours.length == 1)
        hours = "0" + hours;
    var time = hours + ":" + minutes
    timeText.innerText = time;
    dateText.innerText = date;
}


function onMouseUpdate(e) {
    x = e.pageX;
    y = e.pageY;
}

function handleSitesBar () {
    function closeBar () {
        if (flag == 0 && boxPos < 100) {
            document.getElementById("box").style.transform = "translatey("+boxPos+"%)";
            boxPos += boxPos * 10 / 100;
        }
    }
    function openBar () {
        if (flag == 1 && boxPos > 1) {
            document.getElementById("box").style.transform = "translatey("+boxPos+"%)";
            boxPos -= boxPos * 10 / 100; 
        }
    }
    if (y >= (screen.height * 56 / 100))
        flag = 1;
    else
        flag = 0;
    openBar();
    closeBar();
}

var op = 0;
var tr = -10

function fadeInText (element) {    
    if (op < 110) {
        element.style.opacity = op + "%";
        op += 10;
    }
    else {
        console.log("Done - Fade");
        clearInterval(fadeInBg);
    }
}

function moveIn (element) {
    if (tr > 0){
        console.log("Done - Move");
        clearInterval(moveInTime);
    }
    else if (tr > -0.1){
        tr = 0;
    }
    else if (tr < 0){
        element.style.transform = "translatey("+tr+"%"+")";
        tr += Math.abs(tr * 10 / 100);
    }
    else {
        console.log("Done - Move");
        clearInterval(moveInTime);
    }
}

setTime();
var fadeInBg = setInterval(fadeInText, 50, document.getElementById("bg"))
var moveInTime = setInterval(moveIn, 10, document.getElementById("Time"));
setInterval(setTime, 1000);
setInterval(handleSitesBar, 1)