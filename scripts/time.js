const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

async function setTime() {
    const d = new Date();
    var hours = d.getHours().toString();
    var minutes = d.getMinutes().toString();
    if (minutes.length == 1)
        minutes = "0" + minutes;
    if (hours.length == 1)
        hours = "0" + hours;
    var time = hours + ":" + minutes

    var date = days[d.getDay()]+ ". " + d.getDate() + "." + d.getMonth() + 1 + "." + d.getFullYear()
    document.getElementById("Time").innerText = time;
    document.getElementById("Date").innerText = date;
}

export{ setTime };