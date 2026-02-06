setTimeout(()=>{document.body.style.setProperty('opacity','100%');
document.body.style.setProperty('background-color','#090909');}, 100)

const weatherStatus = document.getElementById('weatherStatus');
const locationTextBox = document.createElement('input')
locationTextBox.setAttribute("id","location")
locationTextBox.setAttribute("style", "margin-bottom: 0; border-radius: 10px; border: 1px solid #696969;")
locationTextBox.setAttribute("type","text")
locationTextBox.setAttribute("autocomplete","off")
locationTextBox.setAttribute("placeholder", "Enter the city name")
var autoBt = document.createElement('button')
autoBt.setAttribute('class', "longButton")
autoBt.setAttribute('id', "autoBt")
autoBt.innerText = "Auto-Detect"

chrome.storage.local.get(["widgets"]).then((result) => { 
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
        document.getElementById('searchBarCheck').checked = result['widgets']['search']['status']
        document.getElementById('widgetPanelCheck').checked = result['widgets']['panel']
        
        if(result['widgets']['weather']['location'] != undefined || result['widgets']['weather']['location'] != null)
            locationTextBox.value = result['widgets']['weather']['location']
    }
});

weatherStatus.addEventListener('change', function(e) {
    chrome.storage.local.get(['widgets']).then((result) => {
        result['widgets']['weather']['status'] = weatherStatus.checked;
        chrome.storage.local.set({"widgets":result['widgets']})
        location.reload();
    });
})

autoBt.addEventListener('click', function(e) {
    chrome.storage.local.get(['widgets']).then((response) => {
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
            
        });
    });
    autoBt.innerHTML = "Detected"; setTimeout(() => { autoBt.innerHTML = "Auto-detect"; }, 1000)
})




async function fetchWeatherData() {
    var dat = new Date();
    chrome.storage.local.get(['widgets']).then((response) => {
        response = response.widgets
        if(response.weather.condition == {} || response.weather.condition == null || response.weather.condition == undefined) {
            if(online) {
                if(response.weather.location != null || response.weather.location != undefined) {
                    var url='https://api.weatherapi.com/v1/current.json?key=2907bc91fdf24cf583d115833230612&q='+ response.location +'&aqi=no';
                    fetch(url, params).then((request) => {
                        request.json().then((request) => { 
                            response.weather['condition'] = request
                            response.weather['lastUpdatedWeather'] = dat.getTime()
                            chrome.storage.local.set({"widgets":response})
                        })
                    })
                }
                else { 
                    $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
                        data = data.trim().split('\n').reduce(function(obj, pair) {
                        pair = pair.split('=');
                        return obj[pair[0]] = pair[1], obj;
                        }, {});
                        var url='https://api.weatherapi.com/v1/current.json?key=2907bc91fdf24cf583d115833230612&q='+ data.ip +'&aqi=no';
                        fetch(url, params).then((request) => {
                            request.json().then((request) => { 
                                response.weather['condition'] = request
                                response.weather['lastUpdatedWeather'] = dat.getTime()
                                chrome.storage.local.set({"widgets":response})
                            })
                        })
                    });
                }
            }
            else {
                response.weather['condition'] = {"current":{"temp_c":"--","precip_mm":"--","pressure_mb":"--","wind_kph":"--","humidity":"--","condition":{"code":404}}}
                chrome.storage.local.set({"widgets":response}) 
            }
        }
        else {
            if(((dat.getTime() - response.weather.lastUpdatedWeather) >= 3600000 || response.weather.lastUpdatedWeather == null || response.weather.lastUpdatedWeather == undefined) || ((response.weather.location != response.weather.condition.location.name) )) {
                if(online) {
                    if(response.weather.location != null || response.weather.location != undefined) {
                        var url='https://api.weatherapi.com/v1/current.json?key=2907bc91fdf24cf583d115833230612&q='+ response.weather.location +'&aqi=no';
                        fetch(url, params).then((request) => {
                            request.json().then((request) => { 
                                response.weather['condition'] = request
                                response.weather['lastUpdatedWeather'] = dat.getTime()
                                response.weather['location'] = response.weather.condition.location.name
                                chrome.storage.local.set({"widgets":response})
                            })
                        })
                    }
                    else { 
                        $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
                            data = data.trim().split('\n').reduce(function(obj, pair) {
                            pair = pair.split('=');
                            return obj[pair[0]] = pair[1], obj;
                            }, {});
                            var url='https://api.weatherapi.com/v1/current.json?key=2907bc91fdf24cf583d115833230612&q='+ data.ip +'&aqi=no';
                            fetch(url, params).then((request) => {
                                request.json().then((request) => { 
                                    response.weather['condition'] = request
                                    response.weather['lastUpdatedWeather'] = dat.getTime()
                                    response.weather['location'] = response.weather.condition.location.name
                                    chrome.storage.local.set({"widgets":response})
                                })
                            })
                        });
                    }
                }
                else {
                    response.weather['condition'] = {"current":{"temp_c":"--","condition":{"code":404}}}
                    chrome.storage.local.set({"widgets":response}) 
                }
            }
        }
        if(response.weather.status) {
            try {
                var stats = document.getElementById("weatherStats")
                var icon = document.createElement("span")
                var text = document.createElement("div")
                var city = document.createElement("div")
                text.innerHTML = Math.floor(response.weather.condition.current.temp_c) + "°C"
                city.innerHTML = response.weather.condition.location.name
                city.setAttribute("style","font-size:.7vw;")
                icon.setAttribute("class","material-symbols-outlined")
                icon.setAttribute("id","weatherIcon")
                icon.setAttribute("style","font-size:3vw;")
                icon.innerText = getIcon(response.weather.condition.current.condition.code)
                stats.innerHTML = ""
                stats.appendChild(icon)
                stats.appendChild(text)
                stats.appendChild(city)
            }
            catch {}
        }
        else {
            var stats = document.getElementById("weatherStats")
            stats.innerHTML = ""
            var icon = document.createElement("span")
            icon.setAttribute("class","material-symbols-outlined")
            icon.setAttribute("id","weatherIcon")
            icon.setAttribute("style","font-size:3vw;")
            icon.innerText = "widgets"
            stats.innerHTML = ""
            stats.appendChild(icon)

        }
    });
}



document.getElementById("applyBtW").addEventListener('click', function() { 
    chrome.storage.local.get(["widgets"]).then((result) => { 
        result = result['widgets'];
        if(locationTextBox.value != "")
            result['weather']['location'] = locationTextBox.value
        else
            result['weather']['location'] = null
        chrome.storage.local.set({"widgets":result});
    });
    document.getElementById("applyBtW").innerHTML = "Applied"; setTimeout(() => { document.getElementById("applyBtW").innerHTML = "Apply"; }, 1000)
    fetchWeatherData();
})


// music - deprecated
/*
var clientId = "f47c125dda624fec811445f4dc9dc8d8"
var clientSecret = "621526bd71e840eea1ff55fe724f9c09"
var redirect = "https://minmaltab.web.app/connect.html"

function requestAuth() {
    let url = "https://accounts.spotify.com/authorize"
    url += "?client_id="+clientId+"&response_type=code&redirect_uri="+encodeURI(redirect)+"&show_dialog=true&scope=user-read-playback-state user-modify-playback-state user-read-currently-playing";
    window.open(url)
}

document.getElementById('connectMusic').addEventListener('click', function() { requestAuth(); });
*/

document.getElementById('applyBtSb').addEventListener('click', function(e) {
    chrome.storage.local.get(['widgets']).then((response) => {
        response = response.widgets;
        response['search']['status'] = document.getElementById('searchBarCheck').checked
	    chrome.storage.local.set({"widgets":response});
    })
	document.getElementById("applyBtSb").innerHTML = "Applied"; setTimeout(() => { document.getElementById("applyBtSb").innerHTML = "Apply"; }, 1000)
});

document.getElementById('applyBtWp').addEventListener('click', function(e) {
    chrome.storage.local.get(['widgets']).then((response) => {
        response = response.widgets;
        response['panel'] = document.getElementById('widgetPanelCheck').checked
	    chrome.storage.local.set({"widgets":response});
    })
	document.getElementById("applyBtWp").innerHTML = "Applied"; setTimeout(() => { document.getElementById("applyBtWp").innerHTML = "Apply"; }, 1000)
});