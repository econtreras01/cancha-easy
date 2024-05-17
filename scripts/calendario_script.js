let monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let selectedDates = [];

let now = new Date();
let day = now.getDate();
let month = now.getMonth();
let currentMonth = month;
let year = now.getFullYear();

$(document).ready(function () {
    initCalendar();

    $("#next_month").click(function () {
        getNextMonth();
    });

    $("#last_month").click(function () {
        getPrevMonth();
    });
});

function initCalendar() {
    $("#text_month_02").text(monthName[month]);
    $("#text_year").text(year);

    $(".item_day").remove();

    for (let i = startDay(); i > 0; i--) {
        $(".container_days").append(`<span class="week_days_item item_day prev_days">${getTotalDays(month - 1) - (i - 1)}</span>`);
    }

    for (let i = 1; i <= getTotalDays(month); i++) {
        let $day = $(`<span class="week_days_item item_day calendar-day">${i}</span>`);
        let currentDate = new Date(year, month, i);
        if (currentDate < now && (currentDate.getDate() !== day || currentDate.getMonth() !== currentMonth || currentDate.getFullYear() !== now.getFullYear())) {
            $day.addClass("disabled");
            $day.addClass("todaynot"); 
        } else if (currentDate.getDate() === day && currentDate.getMonth() === currentMonth) {
            // Resaltar el día actual
            if (now.getHours() >= 19) {
                $day.addClass("todaynot"); 
                $day.addClass("disabled");
                $day.addClass("today");
            } else {
                $day.addClass("today");
            }
        }
        $(".container_days").append($day);
    }


    $(".calendar-day").click(function () {
        if ($(this).hasClass("disabled")) return; 

        $(".calendar-day").removeClass("selected");
        $(this).addClass("selected");

        let date = new Date(year, month, parseInt($(this).text()));
        let dateString = date.toISOString().slice(0, 10); 

        selectedDates = []; 
        selectedDates.push(dateString); 

        console.log("Selected date:", dateString);
    });
}

function getNextMonth() {
    if (month !== 11) {
        month++;
    } else {
        year++;
        month = 0;
    }
    initCalendar();
}

function getPrevMonth() {
    if (month !== 0) {
        month--;
    } else {
        year--;
        month = 11;
    }
    initCalendar();
}


function startDay() {
    let start = new Date(year, month, 1);
    return ((start.getDate() - 1) === -1) ? 6 : start.getDay();
}


function leapMonth() {
    return ((year % 400 === 0) || (year % 4 === 0) && (year % 100 !== 0));
}

function getTotalDays() {
    if (month === -1) month = 11;

    let numMonthReal = month + 1;

    if (numMonthReal == 3 || numMonthReal == 5 || numMonthReal == 8 || numMonthReal == 10) {
        return 31;
    } else if (numMonthReal == 0 || numMonthReal == 2 || numMonthReal == 4 || numMonthReal == 6
        || numMonthReal == 7 || numMonthReal == 9 || numMonthReal == 10) {
        return 30;
    } else {
        return leapMonth() ? 29 : 28;
    }
}


