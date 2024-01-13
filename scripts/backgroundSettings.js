function handleMissingData() {
  chrome.storage.local.get(["primaryClr"]).then((result) => { if (result.primaryClr == null || result.primaryClr == undefined) { chrome.storage.local.set({"primaryClr": "#BEBEBE"}); console.log("filling in the gaps - pclr") } })
  chrome.storage.local.get(["secondaryClr"]).then((result) => { if (result.secondaryClr == null || result.secondaryClr == undefined) { chrome.storage.local.set({"secondaryClr": "#BEBEBE"}); console.log("filling in the gaps - sclr") } })
  chrome.storage.local.get(["shortcutDrawer"]).then((result) => { if (result.shortcutDrawer == null || result.shortcutDrawer == undefined) { chrome.storage.local.set({"shortcutDrawer": true}); console.log("filling in the gaps - sd") } })
  chrome.storage.local.get(["shortcuts"]).then((result) => { if (result.shortcuts == null || result.shortcuts == undefined) { chrome.storage.local.set({"shortcuts": []}); console.log("filling in the gaps - s") }  })
}

handleMissingData();
setInterval(handleMissingData, 100)

const imageInput = document.getElementById('bgImgSelector');
const applyBt = document.getElementById('applyBtB');

imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
  
        reader.onload = function(event) {
        const imageUrl = event.target.result;
        chrome.storage.local.set({'bgImage':`url(${imageUrl})`});
      }
  
      reader.readAsDataURL(file);
    }
  });