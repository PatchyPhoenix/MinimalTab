function handleMissingData() {
    chrome.storage.local.get(["primaryClr"]).then((result) => { if (result.primaryClr == null || result.primaryClr == undefined) { chrome.storage.local.set({"primaryClr": "#aeaeae"}); console.log("filling in the gaps - pclr") } })
    chrome.storage.local.get(["secondaryClr"]).then((result) => { if (result.secondaryClr == null || result.secondaryClr == undefined) { chrome.storage.local.set({"secondaryClr": "#303030"}); console.log("filling in the gaps - sclr") } })
    chrome.storage.local.get(["shortcutDrawer"]).then((result) => { if (result.shortcutDrawer == null || result.shortcutDrawer == undefined) { chrome.storage.local.set({"shortcutDrawer": true}); console.log("filling in the gaps - sd") } })
    chrome.storage.local.get(["shortcuts"]).then((result) => { if (result.shortcuts == null || result.shortcuts == undefined) { chrome.storage.local.set({"shortcuts": []}); console.log("filling in the gaps - s") }  })
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

handleMissingData();
setInterval(handleMissingData, 100)
sleep(1000)

chrome.storage.local.get(["shortcutDrawer"]).then((result) => { 
    if (result.shortcutDrawer == true) {
        document.getElementById("shortcutDrawerCheck").checked = true;
    }
 });

chrome.storage.local.get(["primaryClr"]).then((result) => {
        document.getElementById("primaryClr").value = result.primaryClr;
});

chrome.storage.local.get(["secondaryClr"]).then((result) => {
        document.getElementById("secondaryClr").value = result.secondaryClr;
});

document.getElementById("resetBt").addEventListener('click', function() { reset(); location.reload(); })

document.getElementById("applyBt").addEventListener('click', function() { apply(); })

function apply () { 
    chrome.storage.local.get(["secondaryClr"]).then((result) => { if (document.getElementById("shortcuts").value != result) { chrome.storage.local.set({"secondaryClr":document.getElementById("secondaryClr").value}) } })
    chrome.storage.local.set({"shortcutDrawer":document.getElementById("shortcutDrawerCheck").checked});
    chrome.storage.local.set({"shortcutDrawer":document.getElementById("shortcutDrawerCheck").checked});
    chrome.storage.local.get(["secondaryClr"]).then((result) => { if (document.getElementById("secondaryClr").value != result) { chrome.storage.local.set({"secondaryClr":document.getElementById("secondaryClr").value}) } })
    chrome.storage.local.get(["primaryClr"]).then((result) => { if (document.getElementById("primaryClr").value != result) { chrome.storage.local.set({"primaryClr":document.getElementById("primaryClr").value}) } })   
}

function reset () {
    chrome.storage.local.set({"primaryClr":"#aeaeae", "secondaryClr":"#303030", "shortcutDrawer":true});
}

chrome.storage.local.get().then((result) => {console.log(result)})