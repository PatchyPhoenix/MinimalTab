var root = document.querySelector(':root');

chrome.storage.local.get(["primaryClr"]).then((result) => {
    root.style.setProperty('--primaryClr', result.primaryClr)
});


chrome.storage.local.get(["secondaryClr"]).then((result) => {
    root.style.setProperty('--secondaryClr', result.secondaryClr)
});
