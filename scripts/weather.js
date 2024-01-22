let online = window.navigator.onLine;

window.addEventListener("online", function() {
    online = true;
})
  
window.addEventListener("offline", function() {
    online = false;
})

var params = {
    headers:{"Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true ",
    "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
    "Access-Control-Allow-Headers": "Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control"}
};


function fetchWeatherData() {
    var dat = new Date();
    chrome.storage.local.get(['widgets']).then((response) => {
        response = response.widgets.weather
        if(response.condition == {} || response.condition == null || response.condition == undefined) {
            if(online) {
                if(response.location != null || response.location != undefined) {
                    var url='https://api.weatherapi.com/v1/current.json?key=2907bc91fdf24cf583d115833230612&q='+ response.location +'&aqi=no';
                    fetch(url, params).then((request) => {
                        request.json().then((request) => { 
                            response['condition'] = request
                            response['lastUpdatedWeather'] = dat.getTime()
                            chrome.storage.local.set({"widgets":{'weather':response}})
                        })
                    })
                    console.log("Updated weather")
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
                                response['condition'] = request
                                response['lastUpdatedWeather'] = dat.getTime()
                                chrome.storage.local.set({"widgets":{'weather':response}})
                            })
                        })
                        console.log("Updated weather")
                    });
                }
            }
            else {
                response['condition'] = {"current":{"temp_c":"--","condition":{"code":404}}}
                chrome.storage.local.set({"widgets":{"weather":response}}) 
            }
        }
        else {
            if(((dat.getTime() - response.lastUpdatedWeather) >= 3600000 || response.lastUpdatedWeather == null || response.lastUpdatedWeather == undefined) || ((response.location != response.condition.location.name) )) {
                if(online) {
                    if(response.location != null || response.location != undefined) {
                        var url='https://api.weatherapi.com/v1/current.json?key=2907bc91fdf24cf583d115833230612&q='+ response.location +'&aqi=no';
                        fetch(url, params).then((request) => {
                            request.json().then((request) => { 
                                response['condition'] = request
                                response['lastUpdatedWeather'] = dat.getTime()
                                response['location'] = response.condition.location.name
                                chrome.storage.local.set({"widgets":{'weather':response}})
                            })
                        })
                        console.log("Updated weather")
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
                                    response['condition'] = request
                                    response['lastUpdatedWeather'] = dat.getTime()
                                    response['location'] = response.condition.location.name
                                    chrome.storage.local.set({"widgets":{'weather':response}})
                                })
                            })
                            console.log("Updated weather")
                        });
                    }
                }
                else {
                    response['condition'] = {"current":{"temp_c":"--","condition":{"code":404}}}
                    chrome.storage.local.set({"widgets":{"weather":response}}) 
                }
            }
        }
        if(response.status) {
            try {
                var stats = document.getElementById("weatherStats")
                var icon = document.createElement("span")
                var text = document.createElement("div")
                var city = document.createElement("div")
                text.innerHTML = response.condition.current.temp_c + "°C"
                city.innerHTML = response.condition.location.name
                city.setAttribute("style","font-size:.7vw;")
                icon.setAttribute("class","material-symbols-outlined")
                icon.setAttribute("id","weatherIcon")
                icon.setAttribute("style","font-size:3vw;")
                icon.innerText = getIcon(response.condition.current.condition.code)
                stats.innerHTML = ""
                stats.appendChild(icon)
                stats.appendChild(text)
                stats.appendChild(city)
            }
            catch(e) { console.log("Hold on") }
        }
        else {
            var stats = document.getElementById("weatherStats")
            stats.innerHTML = ""
        }
    });
}

fetchWeatherData()
setInterval(fetchWeatherData, 1000);

function getIcon(conditionCode) {
    switch(conditionCode) {
        case 1000: return "clear_day"; // clear_day
        case 1003: return "partly_cloudy_day"; // partly_cloudy_day
        case 1006: return "cloud"; // cloud
        case 1009: return "cloud"; // cloud
        case 1030: return "mist"; // mist
        case 1063: return "partially_cloudy day"; // partially_cloudy day
        case 1066: return "partially_cloudy day"; // partially_cloudy day
        case 1069: return "partially_cloudy day"; // partially_cloudy day
        case 1072: return "cloud"; // cloud
        case 1087: return "thunderstorm"; // thunderstorm
        case 1114: return "cloudy_snowing"; // cloudy_snowing
        case 1117: return "cloudy_snowing"; // cloudy_snowing
        case 1135: return "foggy"; // foggy
        case 1147: return "foggy"; // foggy
        case 1150: return "rainy"; // rainy
        case 1153: return "rainy"; // rainy
        case 1168: return "rainy"; // rainy
        case 1171: return "rainy"; // rainy
        case 1180: return "rainy"; // rainy
        case 1183: return "rainy"; // rainy
        case 1186: return "rainy"; // rainy
        case 1189: return "rainy"; // rainy
        case 1192: return "rainy"; // rainy
        case 1195: return "rainy"; // rainy
        case 1198: return "rainy"; // rainy
        case 1201: return "rainy"; // rainy
        case 1204: return "rainy"; // rainy
        case 1207: return "rainy"; // rainy
        case 1210: return "cloudy_snowing"; // cloudy_snowing
        case 1213: return "cloudy_snowing"; // cloudy_snowing
        case 1216: return "cloudy_snowing"; // cloudy_snowing
        case 1219: return "cloudy_snowing"; // cloudy_snowing
        case 1222: return "cloudy_snowing"; // cloudy_snowing
        case 1225: return "cloudy_snowing"; // cloudy_snowing
        case 1237: return "weather_hail"; // weather_hail
        case 1240: return "rainy"; // rainy
        case 1243: return "rainy"; // rainy
        case 1246: return "rainy"; // rainy
        case 1249: return "rainy"; // rainy
        case 1252: return "rainy"; // rainy
        case 1255: return "cloudy_snowing"; // cloudy_snowing
        case 1258: return "cloudy_snowing"; // cloudy_snowing
        case 1261: return "weather_hail"; // weather_hail
        case 1264: return "weather_hail"; // weather_hail
        case 1273: return "thunderstorm"; // thunderstorm
        case 1276: return "thunderstorm"; // thunderstorm
        case 1279: return "thunderstorm"; // thunderstorm
        case 1282: return "thunderstorm"; // thunderstorm
        default: return "cloud_off";
    }
}