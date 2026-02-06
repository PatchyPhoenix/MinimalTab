const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";
const PLAYER = "https://api.spotify.com/v1/me/player";
const CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing";

var clientId = "f47c125dda624fec811445f4dc9dc8d8"
var clientSecret = "621526bd71e840eea1ff55fe724f9c09"
var redirect = "https://minmaltab.web.app/connect.html"

var currentTrack = null;
var currentArtist = null;

var homeHandler = null;
var newsHandler = null;

var online = window.navigator.onLine;

var mouseOverWeather = false;

var panel = false;

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
        response = response.widgets['search']
        if(response['status'])
            document.getElementById('searchBar').style.display = "inline"
        else
            document.getElementById('searchBar').style.display = "none"
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
        case 1063: return "partly_cloudy day"; 
        case 1066: return "partly_cloudy day"; 
        case 1069: return "partly_cloudy day"; 
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


// music
async function handleMusic() {
    chrome.storage.local.get(["widgets"]).then((result) => { 
        result = result['widgets']['music'];
        if(result['spotify']['accessToken'] != null && result['spotify']['refreshToken'] != null)
            currentlyPlaying()
    });    
}


async function callAuthorizationApi(body){
    console.log('callauthrespapi')
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(clientId + ":" + clientSecret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}


async function handleAuthorizationResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined ){
            access_token = data.access_token;
            chrome.storage.local.get(['widgets']).then((request) => {
                request = request['widgets']
                request['music']['spotify']['accessToken'] = access_token
                chrome.storage.local.set({"widgets":request})
            })
        }
    }
    else
        console.log(this.responseText);
}


async function callApi(method, url, body, callback){
    chrome.storage.local.get(['widgets']).then((response) => {
        response = response['widgets']['music']['spotify']
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + response['accessToken']);
        xhr.send(body);
        xhr.onload = callback;
    })  
}


async function currentlyPlaying(){
    await callApi( "GET", PLAYER + "?market=US", null, handleCurrentlyPlayingResponse );
}


function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

async function handleCurrentlyPlayingResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        if ( data.item != null ){
            
            if(data.item.name != currentTrack) {
                var delay = 0;
                var e = currentTrack;
                var s = "";
                if(currentTrack != null) {
                    delay = currentTrack.length * 75
                    for(var x = e.length; x>-1; x--) {
                        var v = e.slice(0, x);
                        setTimeout((s) => {
                            document.getElementById("song").innerText = s;
                        }, 75*((e.length - x)+1), v)
                    }
                }
                setTimeout(() => {
                    s = "";
                    for(var x = 0; x<data.item.name.length; x++) {
                        s += data.item.name[x]; 
                        setTimeout((s) => {
                            document.getElementById("song").innerText = s;
                            clearTimeout(this)
                    }, 75*(x+1), s)
                    }
                }, delay);
            
            if(data.item.artists[0].name != currentArtist) {
                var delayA = 0;
                var eA = currentArtist;
                var sA = "";

                if(currentArtist != null) {
                    delayA = currentArtist.length * 75
                    for(var y = eA.length; y>-1; y--) {
                        var vA = eA.slice(0, y);
                        setTimeout((s) => {
                            document.getElementById("artist").innerText = s;
                        }, 75*((eA.length - y)+1), vA)
                    }
                }

                sA = "";
                setTimeout(() => {
                    for(var y = 0; y<data.item.artists[0].name.length; y++) {
                        sA += data.item.artists[0].name[y]; 
                        setTimeout((s) => {
                            document.getElementById("artist").innerText = s;
                        }, 75*(y+1), sA)
                    }
                }, delayA);
            }
        }
            currentTrack = data.item.name
            currentArtist = data.item.artists[0].name
        }

        if(data['is_playing']) {
            chrome.storage.local.get(["colours"]).then((result) => {
                var root = document.querySelector(':root');
                var p = result.colours['primary']
                var s = result.colours['secondary']
                if(p == s) {
                    if((hexToRgb(p)['r'] > 220) && (hexToRgb(p)['g'] > 220) && (hexToRgb(p)['b'] > 220)) {
                        p = rgbToHex(hexToRgb(p)['r'] - 35, hexToRgb(p)['g'] - 35, hexToRgb(p)['b'] - 35)
                    }
                    else {
                        s = rgbToHex(hexToRgb(p)['r'] + 35, hexToRgb(p)['g'] + 35, hexToRgb(p)['b'] + 35)
                    }
                }
                root.style.setProperty('--mPrimaryClr', p)
                root.style.setProperty('--mSecondaryClr', s)
            });
            document.getElementById('musicStatus').style.setProperty('animation', "gradient 2s ease infinite")            
        }
        else {
            document.getElementById('musicStatus').style.setProperty('animation', "none")
        }
    }
    else if ( this.status == 204 ) {}

    else if ( this.status == 401 )
        await refreshAccessToken()
    
    else
        console.log(this.responseText);
}


async function refreshAccessToken(){
    chrome.storage.local.get(['widgets']).then((response) => {
        response = response['widgets']['music']['spotify']
        let body = "grant_type=refresh_token";
        body += "&refresh_token=" + response['refreshToken'];
        body += "&client_id=" + clientId;
        callAuthorizationApi(body);
    })
}


// widgetPanel
function handleWidgetPanel() {
    chrome.storage.local.get(['widgets']).then((response) => {
        response = response['widgets']
        if(document.getElementById("widgetsPanel").style.transform == "translateX(0%)") {
                document.getElementById("widgetsPanel").style.transform = "translatex(-100%)";
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
                    homeHandler = setInterval(handleHomeWidget, 1000)
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
    boxDiv.setAttribute('style',"position:relative; bottom:0vw;")
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
                line.setAttribute('style',"background-color:var(--primaryClr); color:var(--primaryClr);height: 1px; margin: 1vh;border: none;")
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


                wind.innerHTML = "<span class='material-symbols-outlined'>air</span><br><b>" + response.weather.condition.current.wind_kph + " km/h</b><br> <u>Wind</u>"
                precip.innerHTML = "<span class='material-symbols-outlined'>beach_access</span><br><b>" + response.weather.condition.current.precip_mm + " mm</b><br> <u>Precipitation</u>"
                pressure.innerHTML = "<span class='material-symbols-outlined'>compress</span><br><b>" + response.weather.condition.current.pressure_mb + " mb</b><br> <u>Pressure</u>"
                humidity.innerHTML = "<span class='material-symbols-outlined'>water_drop</span><br><b>" + response.weather.condition.current.humidity + "%</b><br> <u>Humidity</u>"
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
                boxDiv.appendChild(line)
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
            boxDiv.appendChild(line)
            boxDiv.appendChild(document.createElement("br"))
            boxDiv.appendChild(document.createElement("br"))
        }
        
        var quote = document.createElement("div")
        quote.id = 'quote';
        var author = document.createElement("div")
        quote.setAttribute('style',"font-size:1.5vw;")
        author.setAttribute('style',"text-align:right; font-size:1vw;")
        quote.innerText = response.quotes['quote']
        author.innerHTML = "<u><b>" + response.quotes['author'] + "</b></u>"

        boxDiv.appendChild(quote)
        
        line = document.createElement("hr")
        line.setAttribute('style',"background-color:var(--primaryClr); color:var(--primaryClr);height: 1px; margin: 1vh;border: none;")

        boxDiv.appendChild(document.createElement("br"))
        boxDiv.appendChild(author)
        boxDiv.appendChild(document.createElement("br"))
        boxDiv.appendChild(document.createElement("br"))
        boxDiv.appendChild(line)
    });
}


//quotes
async function fetchQuote() {
    var params = {
        headers:{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true ",
        "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
        "Access-Control-Allow-Headers": "Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control"}
    };
    var dat = new Date();
    chrome.storage.local.get(['widgets']).then((response) => {
        response = response.widgets
        if((((dat.getTime() - response.quotes.lastUpdated) >= (1000*60*60*24) || response.quotes.lastUpdated == null || response.quotes.lastUpdated == undefined) )) {
            if(online) {
                var url='https://zenquotes.io/api/quotes';
                fetch(url, params).then((request) => {
                    request.json().then((request) => { 
                        response.quotes['quote'] = request[0]['q']
                        response.quotes['author'] = "- " + request[0]['a']
                        response.quotes['lastUpdated'] = dat.getTime()
                        chrome.storage.local.set({"widgets":response}) 
                    })
                })
            }
            else {
                response.quotes['quote'] = "I have become death, the destroyer of worlds."
                response.quotes['author'] = "- J Robert Oppenheimer"
                chrome.storage.local.set({"widgets":response}) 
            }
            chrome.storage.local.set({"widgets":response}) 
        }
    });
}

fetchWeatherData()
setInterval(fetchWeatherData, 1000);

//fetchQuote()
//setInterval(fetchQuote, 5000);

handleMusic()
setInterval(handleMusic, 1000);

setInterval(handleSearch, 100);