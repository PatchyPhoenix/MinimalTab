const weatherStatus = document.getElementById('weatherStatus');
const locationTextBox = document.createElement('input')
locationTextBox.setAttribute("id","location")
locationTextBox.setAttribute("style", "margin-bottom: 0; border-radius: 10px;")
locationTextBox.setAttribute("type","text")
locationTextBox.setAttribute("autocomplete","off")
locationTextBox.setAttribute("placeholder", "Enter the city name")
var autoBt = document.createElement('button')
autoBt.setAttribute('class', "longButton")
autoBt.setAttribute('id', "autoBt")
autoBt.innerText = "Auto-Detect"

chrome.storage.local.get("widgets", function(result){ 
    if (result['widgets']['weather']['status'] == true) {
        weatherStatus.checked = true;
        var poweredBy = document.createElement('a')
        poweredBy.setAttribute("href", "https://www.weatherapi.com/")
        poweredBy.setAttribute("style", "color:#BABABA")
        poweredBy.innerText = "WeatherAPI"
        document.getElementById('weatherSettings').appendChild(locationTextBox)
        document.getElementById('weatherSettings').appendChild(document.createElement('br'))
        document.getElementById('weatherSettings').appendChild(document.createElement('br'))
        document.getElementById('weatherSettings').append("Powered by ")
        document.getElementById('weatherSettings').appendChild(poweredBy)
        document.getElementById('weatherSettings').appendChild(document.createElement('br'))
        document.getElementById('weatherSettings').appendChild(document.createElement('br'))
        document.getElementById('weatherSettings').appendChild(autoBt)
        if(result['widgets']['weather']['location'] != undefined || result['widgets']['weather']['location'] != null)
            locationTextBox.value = result['widgets']['weather']['location']
    }
});

weatherStatus.addEventListener('change', function(e) {
    chrome.storage.local.get('widgets', function(result) {
        result['widgets']['weather']['status'] = weatherStatus.checked;
        chrome.storage.local.set({"widgets":result['widgets']})
        location.reload();
    });
})

autoBt.addEventListener('click', function(e) {
    chrome.storage.local.get('widgets', function(response) {
        var dat = new Date();
        response = response.widgets.weather
        $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
            data = data.trim().split('\n').reduce(function(obj, pair) {
            pair = pair.split('=');
            return obj[pair[0]] = pair[1], obj;
            }, {});
            var params = {
                headers:{"Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true ",
                "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
                "Access-Control-Allow-Headers": "Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control"}
            };
            var url='https://api.weatherapi.com/v1/current.json?key=2907bc91fdf24cf583d115833230612&q='+ data.ip +'&aqi=no';
            fetch(url, params).then((request) => {
                request.json().then((request) => { 
                    response['condition'] = request
                    response['lastUpdatedWeather'] = dat.getTime()
                    response['location'] = response.condition.location.name
                    chrome.storage.local.set({"widgets":{'weather':response}})
                    locationTextBox.value = response['location']
                })
            })
            //console.log("Updated weather")
            
        });
    });
    autoBt.innerHTML = "Detected"; setTimeout(() => { autoBt.innerHTML = "Auto-detect"; }, 1000)
})

document.getElementById("applyBtW").addEventListener('click', function() { 
    chrome.storage.local.get("widgets", function(result) { 
        result = result['widgets'];
        if(locationTextBox.value != "")
            result['weather']['location'] = locationTextBox.value
        else
            result['weather']['location'] = null
        chrome.storage.local.set({"widgets":result});
    });
    document.getElementById("applyBtW").innerHTML = "Applied"; setTimeout(() => { document.getElementById("applyBtW").innerHTML = "Apply"; }, 1000)
 }) 