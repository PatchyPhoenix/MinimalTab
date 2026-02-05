const urlParams = new URLSearchParams(window.location.search);

const code = urlParams.get("code");

const TOKEN = "https://accounts.spotify.com/api/token";
var clientId = "f47c125dda624fec811445f4dc9dc8d8"
var clientSecret = "621526bd71e840eea1ff55fe724f9c09"
var redirect = "https://minmaltab.web.app/connect.html"


if(window.location.href.startsWith("https://minmaltab.web.app/connect.html")){
    if(code == null || code == undefined) {
        document.getElementById('connectedStatus').innerHTML = "Failed to Connect";
        document.getElementById('closeTab').innerHTML = "You may close this tab <br><br>";
    }
    else
        chrome.storage.local.get(["widgets"]).then((result) => { 
            result = result['widgets'];
            result['music']['spotify']['code'] = code
            chrome.storage.local.set({"widgets":result});
        });
        fetchAccessToken(code)
        chrome.storage.local.get(["widgets"]).then((result) => { 
            result = result['widgets'];
            if (result['music']['spotify']['accessToken'] != null || result['music']['spotify']['accessToken'] != undefined) {
                document.getElementById('connectedStatus').innerHTML = 'Connected <span style="color: rgb(30, 215, 96);">Spotify</span> Account!';
                document.getElementById('closeTab').innerHTML = "You may close this tab <br><br>";
            }
            else {
                document.getElementById('connectedStatus').innerHTML = "Failed to Connect";
                document.getElementById('closeTab').innerHTML = "You may close this tab <br><br>";
            }
        });
}


function fetchAccessToken( code ){
    let body = "grant_type=authorization_code&code=" + code + "&redirect_uri=" + encodeURI(redirect) + "&client_id=" + clientId + "&client_secret=" + clientSecret;
    callAuthorizationApi(body);
}


function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(clientId + ":" + clientSecret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}


function handleAuthorizationResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined && data.refresh_token  != undefined ){
            refresh_token = data.refresh_token;
            access_token = data.access_token;
            chrome.storage.local.get(['widgets']).then((request) => {
                request = request['widgets']
                if(access_token != null || access_token != undefined)
                    request['music']['spotify']['accessToken'] = access_token
                if(refresh_token != null || refresh_token != undefined)
                    request['music']['spotify']['refreshToken'] = refresh_token
                chrome.storage.local.set({"widgets":request})
                window.location.reload()
            })
        }
    }
    else
        console.log(this.responseText);
}