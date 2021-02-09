

export function getDisplayedDate(dateString) {
    //split date from server
    dateString = dateString.split(' ')
    const month = dateString[1];
    const dateOfMonth = dateString[2];
    const year = dateString[3];
    const time = dateString[4];

    const monthAt = getMonthNumber(month);
    var newDateString = year + '-' + monthAt + '-' + dateOfMonth + 'T' + time;
    var selectedDate = new Date(Date.parse(newDateString))  //get timemillis of selected date
    var todayDate = new Date()  //get timemillis of current date

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((todayDate - selectedDate) / oneDay)); //get different days

    if (diffDays >= 7) {
        return dateOfMonth + " " + month + " " + year
    } else if ((diffDays < 7) && (diffDays >= 1)) {
        return diffDays + " days ago"
    } else {
        return "now"
    }
}

function getMonthNumber(month) {
    var months = {
        'Jan' : '01',
        'Feb' : '02',
        'Mar' : '03',
        'Apr' : '04',
        'May' : '05',
        'Jun' : '06',
        'Jul' : '07',
        'Aug' : '08',
        'Sep' : '09',
        'Oct' : '10',
        'Nov' : '11',
        'Dec' : '12'
    }

    return months[month];
}