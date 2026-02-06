var x, y;
var Flag = 0;

document.getElementById("settings").addEventListener('click', function() { 
    chrome.windows.getCurrent().then((result) => {
        chrome.sidePanel.open({"windowId":result.id})
    });
    chrome.sidePanel.setOptions({"path":"settings/index.html"})
})


window.addEventListener("online", function() {
    online = true;
})
  
window.addEventListener("offline", function() {
    online = false;
})


document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);


async function onMouseUpdate(e) {
    x = e.pageX;
    y = e.pageY;
}


async function handleSettingsButton() {
    chrome.storage.local.get(['alwaysOnSettingsButton']).then((response) => {    
        if (!response.alwaysOnSettingsButton) {    
            if (x >= (window.innerWidth * 90 / 100) && y <= (window.innerHeight * 10 / 100))
                Flag = 1;
            else
                Flag = 0;

            function close () {
                if (Flag == 0) {
                    document.getElementById("settings").style.right = "-4vw";
                }
            }

            function open () {
                document.getElementById("settings").style.right = "1vw";
            }

            open();
            close();
        }
        else
            document.getElementById("settings").style.right = "1vw";
    })
}


setInterval(handleSettingsButton, 300)