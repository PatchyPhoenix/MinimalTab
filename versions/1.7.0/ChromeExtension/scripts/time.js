function setTime() {
    const d = new Date();
    var date = d.toDateString();
    var hours = d.getHours().toString();
    var minutes = d.getMinutes().toString();
    if (minutes.length == 1)
        minutes = "0" + minutes;
    if (hours.length == 1)
        hours = "0" + hours;
    var time = hours + ":" + minutes
    document.getElementById("Time").innerText = time;
    document.getElementById("Date").innerText = date;
    delete date, hours, minutes, time;
}

setTime();
setInterval(setTime, 1000);