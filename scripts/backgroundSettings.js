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