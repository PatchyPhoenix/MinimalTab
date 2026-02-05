const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


async function setTime() {
    const d = new Date();
    var day = days[d.getDay()];
    var date = (d.getDate()).toString();
    var month = (d.getMonth() + 1).toString();
    var year = d.getFullYear();
    var hours = d.getHours().toString();
    var minutes = d.getMinutes().toString();
    if (month.length == 1)
        month = "0" + month;
    if (date.length == 1)
        date = "0" + date;
    if (minutes.length == 1)
        minutes = "0" + minutes;
    if (hours.length == 1)
        hours = "0" + hours;
    var time = hours + ":" + minutes

    var date = day + ". " + date + "." + month + "." + year
    document.getElementById("Time").innerText = time;
    document.getElementById("Date").innerText = date;
}


export{ setTime };