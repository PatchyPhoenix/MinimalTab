var open = false;

document.getElementById("settings").addEventListener('click', function() { 
    if(open) {
        document.getElementById("settingsFrame").style.transform = "translatex(100%)"
        document.getElementById("settings").style.transform = "translatex(0%)"
        open = false;
    }
    else {
        document.getElementById("settingsFrame").style.transform = "translatex(0%)"
        document.getElementById("settings").style.transform = "translatex(-950%)"
        open = true;
    }
})