setTimeout(()=>{document.body.style.setProperty('opacity','100%');
document.body.style.setProperty('background-color','#050505');}, 100)

// store type (img or clr)
chrome.storage.local.get(["colours"]).then((result) => {
  	document.getElementById("primaryClr").value = result.colours['primary'];
  	document.getElementById("secondaryClr").value = result.colours['secondary'];
});


chrome.storage.local.get(["background", 'alwaysOnSettingsButton']).then((response) => {
  	var dropdown = document.getElementById("bgSelect")
	if(response.background['type'] == "image") {
		dropdown.value = "image"
		handleInputFields();
	}
	else if(response.background['type'] == "colour") {
		dropdown.value = "colour"
		handleInputFields();
		document.getElementById("bgClrSelector").value = response.background['src']
	}
	document.getElementById('alwaysOnSettingsButtonCheck').checked = !response.alwaysOnSettingsButton
})


async function handleImage() {
	const imageInput = document.getElementById('bgImgSelector');
	imageInput.addEventListener('change', function(e) {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = function(event) {
				const imageUrl = event.target.result;
				chrome.storage.local.set({'background':{"type":"image","src":`url(${imageUrl})`}});
				console.log("done")
			}
			reader.readAsDataURL(file);
		}
    });
}


function handleColour() {
	const applyBt = document.getElementById('applyBtBc');
	applyBt.addEventListener('click', function(e) {
		chrome.storage.local.set({'background':{"type":"colour","src":document.getElementById("bgClrSelector").value}});
      	document.getElementById("applyBtBc").innerHTML = "Applied";
  	  	setTimeout(() => { document.getElementById("applyBt").innerHTML = "Apply"; }, 1000)
  	});
}


var image = setInterval(handleImage, 250)
var colour = setInterval(handleColour, 250)


function handleInputFields() {
	var stat = document.getElementById("bgSelect").value;
	var label = document.createElement("label");
	label.setAttribute("class","text")
	label.setAttribute("style","font-size: 14px;")
	var input = document.createElement("input");
	var settingsDiv = document.getElementById("settings")

	if(stat == 'image'){
		clearInterval(colour)
		label.innerHTML = "Image"
		input.setAttribute("id","bgImgSelector")
		input.setAttribute("type","file")
		input.setAttribute("accept","image/png, image/gif, image/jpeg")
		settingsDiv.innerHTML = ""
		settingsDiv.appendChild(input)
		image = setInterval(handleImage,250)
	}
	else if(stat == 'colour') {
		clearInterval(image)
		var applyBt = document.createElement("button")
		applyBt.setAttribute("class","longButton")
		applyBt.setAttribute('id',"applyBtBc")
		applyBt.innerHTML = "Apply"
		var di =document.createElement('div')
		di.setAttribute('style','text-align:center;')
		di.appendChild(applyBt)
		label.innerHTML = "Colour"
		input.setAttribute("id","bgClrSelector")
		input.setAttribute("type","color")
		settingsDiv.innerHTML = ""
		settingsDiv.appendChild(input)
		settingsDiv.appendChild(document.createElement('br'))
		settingsDiv.appendChild(di)
		colour = setInterval(handleColour, 250)
	}
}


handleInputFields();


document.getElementById("bgSelect").addEventListener("change", handleInputFields)


document.getElementById("applyBt").addEventListener('click', function() { 
	apply();
	document.getElementById("applyBt").innerHTML = "Applied";
	setTimeout(() => { document.getElementById("applyBt").innerHTML = "Apply"; }, 1000)
})


async function apply () { 
	chrome.storage.local.get(["colours"]).then((result) => { 
		if (document.getElementById("secondaryClr").value != result.colours['secondary'])
			result.colours['secondary'] = document.getElementById('secondaryClr').value
		if (document.getElementById("primaryClr").value != result.colours['primary'])
			result.colours['primary'] = document.getElementById('primaryClr').value
		chrome.storage.local.set({"colours":result.colours}) 
    })
}


const applyBt = document.getElementById('applyBtSB');
applyBt.addEventListener('click', function(e) {
	chrome.storage.local.set({"alwaysOnSettingsButton":(!document.getElementById('alwaysOnSettingsButtonCheck').checked)});
	document.getElementById("applyBtSB").innerHTML = "Applied"; setTimeout(() => { document.getElementById("applyBtSB").innerHTML = "Apply"; }, 1000)
});