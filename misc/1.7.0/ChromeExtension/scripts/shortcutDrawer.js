var x, y;
var boxPos = 80;

chrome.storage.local.get(["shortcuts"]).then((result) => { 
    result = result.shortcuts;
    var boxDiv = document.getElementById("box");
    if (result.length != 0)
        for(var i = 0;i < result.length;i++) { 
            console.log(i);
            var link = document.createElement('a');
            var image = document.createElement("img");
            image.setAttribute('src',("https://s2.googleusercontent.com/s2/favicons?domain=" + result[i]));
            link.setAttribute("href",result[i]);
            link.setAttribute("class","button");
            link.appendChild(image);
            boxDiv.appendChild(link);
        } 
    else {
        var link = document.createElement('a');
        var image = document.createElement("img");
        image.setAttribute('src',("https://s2.googleusercontent.com/s2/favicons?domain=https://google.com"));
        link.setAttribute("href","https://google.com");
        link.setAttribute("class","button");
        link.appendChild(image);
        boxDiv.appendChild(link);
    }
});

document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);

function onMouseUpdate(e) {
    x = e.pageX;
    y = e.pageY;
}

chrome.storage.local.get(["shortcutDrawer"]).then((result) => { if (result.shortcutDrawer){ setInterval(handleSitesBar, 1) } })
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