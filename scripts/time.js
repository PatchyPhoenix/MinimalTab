const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function setTime() {
    const d = new Date();
    var date = d.getDate();
    var day = days[d.getDay()];
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var hours = d.getHours().toString();
    var minutes = d.getMinutes().toString();
    if (minutes.length == 1)
        minutes = "0" + minutes;
    if (hours.length == 1)
        hours = "0" + hours;
    var time = hours + ":" + minutes

    var date = day+ ". " + date + "." + month + "." + year
    document.getElementById("Time").innerText = time;
    document.getElementById("Date").innerText = date;
    delete date, hours, minutes, time;
}

function addSuffix (no) {
    no = no % 10;
    if(no == 1)
        return "st"
    else if(no == 2)
        return "nd"
    else if(no == 3)
        return 'rd'
    else
        return 'th'
}

setTime();
setInterval(setTime, 1000);

// deprecated
/*function getDayString (day) {
    switch(day) {
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
    }
}*/

// deprecated
/*function getMonthString (month) {
    switch(month) {
        case 0: return "January";
        case 1: return "February";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May";
        case 5: return "June";
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";
        case 11: return "December";
    }
}*/