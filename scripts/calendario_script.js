var monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var selectedDates = []; // Array para almacenar las fechas seleccionadas

var now = new Date();
var day = now.getDate();
var month = now.getMonth();
var currentMonth = month;
var year = now.getFullYear();

$(document).ready(function () {
    initCalendar(); // Llamada a la función para inicializar el calendario

    // Establecer el evento de clic para el botón de siguiente mes
    $("#next_month").click(function () {
        getNextMonth();
    });

    // Establecer el evento de clic para el botón de mes anterior
    $("#last_month").click(function () {
        getPrevMonth();
    });
});

function initCalendar() {
    // Establecer el nombre del mes y el año en el calendario
    $("#text_month_02").text(monthName[month]);
    $("#text_year").text(year);

    // Eliminar los días previamente generados
    $(".item_day").remove();

    // Generar los días del mes anterior (si es necesario)
    for (let i = startDay(); i > 0; i--) {
        $(".container_days").append(`<span class="week_days_item item_day prev_days">${getTotalDays(month - 1) - (i - 1)}</span>`);
    }

        // Generar los días del mes actual
        for (let i = 1; i <= getTotalDays(month); i++) {
            var $day = $(`<span class="week_days_item item_day calendar-day">${i}</span>`);
            var currentDate = new Date(year, month, i);
            if (currentDate < now && (currentDate.getDate() !== day || currentDate.getMonth() !== currentMonth || currentDate.getFullYear() !== now.getFullYear())) {
                $day.addClass("disabled"); // Deshabilitar días anteriores al día actual, excepto el día actual
                $day.addClass("todaynot"); // Resaltar los días deshabilitados
            } else if (currentDate.getDate() === day && currentDate.getMonth() === currentMonth) {
                // Resaltar el día actual
                if (now.getHours() >= 19) {
                    $day.addClass("todaynot"); // Marcar como todaynot si son pasadas las 19:00
                    $day.addClass("disabled");
                    $day.addClass("today");
                } else {
                    $day.addClass("today");
                }
            }
            $(".container_days").append($day);
        }


    // Establecer el evento de clic para cada día del calendario
    $(".calendar-day").click(function () {
        if ($(this).hasClass("disabled")) return; // Salir si el día está deshabilitado
        
        // Remover la clase "selected" de todos los días y seleccionar solo el día clickeado
        $(".calendar-day").removeClass("selected");
        $(this).addClass("selected");
        
        var date = new Date(year, month, parseInt($(this).text())); // Crear objeto de fecha
        var dateString = date.toISOString().slice(0, 10); // Convertir la fecha a una cadena ISO
        
        selectedDates = []; // Reiniciar el array de fechas seleccionadas
        selectedDates.push(dateString); // Agregar la fecha seleccionada al array
        
        console.log("Selected date:", dateString); // Mostrar la fecha seleccionada en la consola
    });
}

// Función para avanzar al siguiente mes
function getNextMonth() {
    if (month !== 11) {
        month++;
    } else {
        year++;
        month = 0;
    }
    initCalendar(); // Volver a generar el calendario para el nuevo mes
}

// Función para retroceder al mes anterior
function getPrevMonth() {
    if (month !== 0) {
        month--;
    } else {
        year--;
        month = 11;
    }
    initCalendar(); // Volver a generar el calendario para el nuevo mes
}

// Función para obtener el día de la semana en que comienza el mes
function startDay() {
    var start = new Date(year, month, 1);
    return ((start.getDate() - 1) === -1) ? 6 : start.getDay();
}

// Función para determinar si el año actual es bisiesto
function leapMonth() {
    return ((year % 400 === 0) || (year % 4 === 0) && (year % 100 !== 0));
}

// Función para obtener el número total de días en el mes actual
function getTotalDays() {
    if (month === -1) month = 11;

    var numMonthReal = month + 1;

    if (numMonthReal == 3 || numMonthReal == 5 || numMonthReal == 8 || numMonthReal == 10) {
        return 31;
    } else if (numMonthReal == 0 || numMonthReal == 2 || numMonthReal == 4 || numMonthReal == 6
        || numMonthReal == 7 || numMonthReal == 9 || numMonthReal == 10) {
        return 30;
    } else {
        return leapMonth() ? 29 : 28;
    }
}
