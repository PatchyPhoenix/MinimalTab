let online = window.navigator.onLine;

window.addEventListener("online", function() {
    online = true;
})
  
window.addEventListener("offline", function() {
    online = false;
})

const url='https://api.weatherapi.com/v1/current.json?key=2907bc91fdf24cf583d115833230612&q=Bengaluru&aqi=no';
var params = {
    headers:{"Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true ",
    "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
    "Access-Control-Allow-Headers": "Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control"}
};


function fetchWeatherData() {
    var dat = new Date();
    chrome.storage.local.get(['lastUpdatedWeather']).then((request) => {
        if((dat.getTime() - request.lastUpdatedWeather) >= 3600000 || request.lastUpdatedWeather == null || request.lastUpdatedWeather == undefined) { 
            if(online)
                fetch(url, params).then((request) => {
                    request.json().then((response) => { 
                        chrome.storage.local.set({"weather":response, "lastUpdatedWeather":dat.getTime()}) 
                    })
                })
            else
                chrome.storage.local.set({"weather":{"current":{"temp_c":"--","condition":{"code":404}}}}) 
        }
    })
}


function updateStats() {
    chrome.storage.local.get(['weather']).then((request) => {
        var stats = document.getElementById("weatherStats")
        var icon = document.createElement("span")
        var text = document.createElement("div")
        text.innerHTML = request.weather.current.temp_c + "°C"
        icon.setAttribute("class","material-symbols-outlined")
        icon.setAttribute("style","font-size:3vw;")
        icon.innerText = getIcon(request.weather.current.condition.code)
        stats.innerHTML = ""
        stats.appendChild(icon)
        stats.appendChild(text)
    });
}


setInterval(fetchWeatherData, 10);
setInterval(updateStats, 10);


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