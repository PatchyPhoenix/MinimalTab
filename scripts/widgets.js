

var homeHandler = null;

var online = window.navigator.onLine;

var mouseOverWeather = false;

window.addEventListener("online", function() {
    online = true;
})
  
window.addEventListener("offline", function() {
    online = false;
})

document.getElementById('weatherStats').addEventListener("mouseover", () => { mouseOverWeather=true });
document.getElementById('weatherStats').addEventListener("mouseout", () => { mouseOverWeather=false });


document.addEventListener('mousedown', onMouseUpdate, false);

document.getElementById("weatherStats").addEventListener('click', handleWidgetPanel)

function onMouseUpdate(e) {
    var x = e.pageX;
    // opened
    if(document.getElementById("widgetsPanel").style.transform == "translateX(0%)") {
        if(x >= (window.innerWidth * 30 / 100) && (!mouseOverWeather))
            handleWidgetPanel()
    }
}


// search bar
function handleSearch() {
    chrome.storage.local.get(['widgets']).then((response) => {
        response = response.widgets

        if(response['search']['status']) {
            document.getElementById('searchBar').style.opacity = 1
            document.getElementById('searchBar').style.display = "inline"
        }
        else {
            document.getElementById('searchBar').style.display = "none"
            document.getElementById('searchBar').style.opacity = 0
        }
    })
}

document.getElementById('searchBar').addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        var query = document.getElementById('searchBar').value
        query.replace(" ", "+")
        window.location.href = "https://www.google.com/search?q="+query
    }
});


// weather
var params = {
    headers:{"Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true ",
    "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
    "Access-Control-Allow-Headers": "Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control"}
};


function getIcon(conditionCode) {
    switch(conditionCode) {
        case 1000: return "clear_day"; 
        case 1003: return "partly_cloudy_day"; 
        case 1006: return "cloud"; 
        case 1009: return "cloud"; 
        case 1030: return "mist"; 
        case 1063: return "partly_cloudy_day"; 
        case 1066: return "partly_cloudy_day"; 
        case 1069: return "partly_cloudy_day"; 
        case 1072: return "cloud"; 
        case 1087: return "thunderstorm"; 
        case 1114: return "cloudy_snowing"; 
        case 1117: return "cloudy_snowing"; 
        case 1135: return "foggy";
        case 1147: return "foggy";
        case 1150: return "rainy";
        case 1153: return "rainy";
        case 1168: return "rainy";
        case 1171: return "rainy";
        case 1180: return "rainy";
        case 1183: return "rainy";
        case 1186: return "rainy";
        case 1189: return "rainy";
        case 1192: return "rainy";
        case 1195: return "rainy";
        case 1198: return "rainy";
        case 1201: return "rainy";
        case 1204: return "rainy";
        case 1207: return "rainy";
        case 1210: return "cloudy_snowing";
        case 1213: return "cloudy_snowing";
        case 1216: return "cloudy_snowing";
        case 1219: return "cloudy_snowing";
        case 1222: return "cloudy_snowing";
        case 1225: return "cloudy_snowing";
        case 1237: return "weather_hail";
        case 1240: return "rainy";
        case 1243: return "rainy";
        case 1246: return "rainy";
        case 1249: return "rainy";
        case 1252: return "rainy";
        case 1255: return "cloudy_snowing";
        case 1258: return "cloudy_snowing";
        case 1261: return "weather_hail";
        case 1264: return "weather_hail";
        case 1273: return "thunderstorm";
        case 1276: return "thunderstorm";
        case 1279: return "thunderstorm";
        case 1282: return "thunderstorm";
        default: return "cloud_off";
    }
}


async function fetchWeatherData() {
    var dat = new Date();
    chrome.storage.local.get(['widgets']).then((response) => {
        response = response.widgets

        if (response.weather.status) {
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



// widgetPanel
function handleWidgetPanel() {
    chrome.storage.local.get(['widgets']).then((response) => {
        response = response['widgets']

        if (!response['widgetPanel'] && !response['weather']['status'])
            document.getElementById("weatherStats").style.display = "none";

        if(document.getElementById("widgetsPanel").style.transform == "translateX(0%)") {
                document.getElementById("widgetsPanel").style.transform = "translatex(-105%)";
                document.getElementById("weatherStats").style.transform = "translatex(0%)";
                if(homeHandler != null)
                    clearInterval(homeHandler)
                homeHandler = null
        }
        else {
            if(response.panel == true) {
                document.getElementById("widgetsPanel").style.transform = "translatex(0%)";
                document.getElementById("weatherStats").style.transform = "translatex(30vw)";
                handleHomeWidget()
                if(homeHandler == null)
                    homeHandler = setInterval(handleHomeWidget, 10000)
            }
        }
    })
}


function clearPanel() {
    document.getElementById("widgetPanelContent").innerHTML = ""
}


function handleHomeWidget() {
    chrome.storage.local.get(['widgets']).then((response) => {
        response = response['widgets']
        if(!response.panel)
            handleWidgetPanel()
    })
    var boxDiv = document.getElementById("widgetPanelContent");
    boxDiv.setAttribute('style',"position:relative; bottom:0vw; padding-top:12vh;")
    chrome.storage.local.get(['widgets']).then((response) => {
        response = response.widgets
        if(response.weather.condition == {} || response.weather.condition == null || response.weather.condition == undefined) {
            response.weather['condition'] = {"current":{"temp_c":"--","condition":{"code":404}}}
            chrome.storage.local.set({"widgets":response});
        }
            var line;
            if(response.weather.status) {
            try {
                line = document.createElement("hr")
                line.setAttribute('style',"background-color:var(--primaryClr); color:var(--primaryClr);height: 1px; margin: 1vh; border: none;")
                var icon = document.createElement("span")
                var text = document.createElement("div")
                var city = document.createElement("div")
                var wind = document.createElement("div")
                var pressure = document.createElement("div")
                var precip = document.createElement("div")
                var humidity = document.createElement("div")

                text.setAttribute('style',"font-size:2.5vw")
                wind.setAttribute('class',"weatherInfoBox")
                pressure.setAttribute('class',"weatherInfoBox")
                precip.setAttribute('class',"weatherInfoBox")
                humidity.setAttribute('class',"weatherInfoBox")


                wind.innerHTML = "<span class='material-symbols-outlined'>air</span><br><b>" + response.weather.condition.current.wind_kph + " km/h</b><br> Wind"
                precip.innerHTML = "<span class='material-symbols-outlined'>beach_access</span><br><b>" + response.weather.condition.current.precip_mm + " mm</b><br> Precipitation"
                pressure.innerHTML = "<span class='material-symbols-outlined'>compress</span><br><b>" + response.weather.condition.current.pressure_mb + " mb</b><br> Pressure"
                humidity.innerHTML = "<span class='material-symbols-outlined'>water_drop</span><br><b>" + response.weather.condition.current.humidity + "%</b><br> Humidity"
                text.innerHTML = response.weather.condition.current.temp_c + "°C | " + response.weather.condition.current.temp_f + "°F"
                city.innerHTML = "<b>" + response.weather.condition.location.name + "</b>"
                city.setAttribute("style","font-size:1.5vw;")
                icon.setAttribute("class","material-symbols-outlined")
                icon.setAttribute("id","weatherIcon")
                icon.setAttribute("style","font-size:5vw; padding:2vw; padding-bottom:0vw;")
                icon.innerText = getIcon(response.weather.condition.current.condition.code)
                boxDiv.innerHTML = ""

                boxDiv.appendChild(icon)
                boxDiv.appendChild(text)
                boxDiv.appendChild(city)
                boxDiv.appendChild(document.createElement("br"))
                boxDiv.appendChild(humidity)
                boxDiv.appendChild(precip)
                boxDiv.appendChild(wind)
                boxDiv.appendChild(pressure)
                boxDiv.appendChild(document.createElement("br"))
                boxDiv.appendChild(document.createElement("br"))
                //boxDiv.appendChild(line)
                boxDiv.appendChild(document.createElement("br"))
                boxDiv.appendChild(document.createElement("br"))
            }
            catch {}
        }
        else {
            boxDiv.innerHTML = ""
            
            line = document.createElement("hr")
            line.setAttribute('style',"background-color:var(--primaryClr); color:var(--primaryClr);height: 1px; margin: 1vh;border: none;")

            var icon = document.createElement("span")
            icon.setAttribute("class","material-symbols-outlined")
            icon.setAttribute("id","weatherIcon")
            icon.setAttribute("style","font-size:5vw; padding:2vw;")
            icon.innerText = "home"

            boxDiv.appendChild(icon)
            //boxDiv.appendChild(line)
            boxDiv.appendChild(document.createElement("br"))
            boxDiv.appendChild(document.createElement("br"))
        }
    });
}


function handleWidgetVisibility() {
    chrome.storage.local.get(['widgets']).then((response) => {
        response = response['widgets']
        if (!response['panel'] && !response['weather']['status'])
            document.getElementById("weatherStats").style.display = "none";
        else {
            if (window.getComputedStyle(document.getElementById("weatherStats")).display == "none")
                fetchWeatherData()
            document.getElementById("weatherStats").style.display = "block";
        }
    });
}


fetchWeatherData()
handleWidgetVisibility()
setInterval(fetchWeatherData, 1000*60*30);
setInterval(handleWidgetVisibility, 1000);


// deprecated -> chrome only
//handleMusic()
//setInterval(handleMusic, 1000);

setInterval(handleSearch, 400);


export { fetchWeatherData }