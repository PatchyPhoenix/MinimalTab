document.getElementById("settings").addEventListener('click', function() { 
    chrome.windows.getCurrent().then((result) => {
        chrome.sidePanel.open({"windowId":result.id}) 
    });
    chrome.sidePanel.setOptions({"path":"settings.html"})
})