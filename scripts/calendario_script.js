let monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let selectedHours = [];
let selectedDay = null;

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

    function initCalendar() {
        $(".item_day").remove();

        $("#text_month_02").text(monthName[month]);
        $("#text_year").text(year);

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
                if (now.getHours() >= 19) {
                    $day.addClass("todaynot");
                    $day.addClass("disabled");
                    $day.addClass("today");
                } else {
                    $day.addClass("today");
                }
            }

            $day.click(function () {
                if ($(this).hasClass("disabled")) return;
                $(".calendar-day").removeClass("selected");
                $(this).addClass("selected");
                
                selectedDay = new Date(year, month, parseInt($(this).text()));
                clearSelectedHours();
                updateReservaMensaje();
            });

            $(".container_days").append($day);
        }

        $(".hours_container").empty();
        for (let i = 10; i <= 19; i++) {
            $(".hours_container").append(`<div class="hour_item" id="hour_${i}" data-hour="${i}">${i}:00</div>`);
        }

        $(".hour_item").click(function () {
            if ($(this).hasClass("disabled") || !selectedDay || isPastHour($(this).data("hour"))) return;
            $(this).toggleClass("selected");
            let hour = $(this).data("hour");
            let index = selectedHours.indexOf(hour);
            if (index === -1) {
                selectedHours.push(hour);
            } else {
                selectedHours.splice(index, 1);
            }

            let newDate = new Date(selectedDay.getTime());
            newDate.setHours(hour);
            selectedDay = newDate;

            updateReservaMensaje();
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

    $("#guardarReserva").click(function () {
        if (!selectedDay || selectedHours.length === 0) return;
        
        let usuarioId = '12345678-9';
        let canchaId = 1;
        let año = selectedDay.getFullYear();
        let mes = ('0' + (selectedDay.getMonth() + 1)).slice(-2);
        let dia = ('0' + selectedDay.getDate()).slice(-2);
        let fechaReserva = `${año}-${mes}-${dia}`;
        
        let horaInicio = selectedDay.toLocaleTimeString('es-CL', { hour12: false, hour: '2-digit', minute: '2-digit' });
        selectedDay.setHours(selectedDay.getHours() + 1);
        let horaFin = selectedDay.toLocaleTimeString('es-CL', { hour12: false, hour: '2-digit', minute: '2-digit' });
        
        let estado = 1;

        let reservaData = {
            usuario: usuarioId,
            cancha: canchaId,
            fecha: fechaReserva,
            hora_inicio: horaInicio,
            hora_fin: horaFin,
            estado: estado
        };

        console.log(reservaData);

        $.ajax({
            url: 'http://127.0.0.1:8000/api/reservas/',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(reservaData),
            success: function (response) {
                console.log('Reserva creada:', response);
                window.location.href = "reservalista.html?id=" + response.id_reserva;
            },
            error: function (error) {
                console.error('Error al crear reserva:', error);
            }
        });
    });

    $("#pagarReserva").click(function () {
        if (!selectedDay || selectedHours.length === 0) return;
        
        let usuarioId = '12345678-9';
        let canchaId = 1;
        let año = selectedDay.getFullYear();
        let mes = ('0' + (selectedDay.getMonth() + 1)).slice(-2);
        let dia = ('0' + selectedDay.getDate()).slice(-2);
        let fechaReserva = `${año}-${mes}-${dia}`;
        
        let horaInicio = selectedDay.toLocaleTimeString('es-CL', { hour12: false, hour: '2-digit', minute: '2-digit' });
        selectedDay.setHours(selectedDay.getHours() + 1);
        let horaFin = selectedDay.toLocaleTimeString('es-CL', { hour12: false, hour: '2-digit', minute: '2-digit' });
        
        let estado = 1;

        let reservaData = {
            usuario: usuarioId,
            cancha: canchaId,
            fecha: fechaReserva,
            hora_inicio: horaInicio,
            hora_fin: horaFin,
            estado: estado
        };

        $.ajax({
            url: 'http://127.0.0.1:8000/api/reservas/',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(reservaData),
            success: function (response) {
                console.log('Reserva creada:', response);
                window.location.href = "carrito.html?id=" + response.id_reserva;
            },
            error: function (error) {
                console.error('Error al crear reserva:', error);
                alert('Error al crear reserva.');
            }
        });
    });

    function isPastHour(hour) {
        let now = new Date();
        let currentHour = now.getHours();
        let selectedDate = new Date(selectedDay);
        if (now.getDate() === selectedDate.getDate() && now.getMonth() === selectedDate.getMonth() && now.getFullYear() === selectedDate.getFullYear()) {
            return hour <= currentHour;
        }
        return false;
    }

    function updateReservaMensaje() {
        let mensaje = "RESERVA ";
        if (selectedDay) {
            let fecha = new Date(selectedDay);
            let mes = monthName[fecha.getMonth()];
            let año = fecha.getFullYear();
            let dia = fecha.getDate();
            mensaje += `${mes} ${año} día ${dia} : `;
        }
        if (selectedHours.length > 0) {
            selectedHours.sort(function (a, b) {
                return a - b;
            });
            mensaje += selectedHours.map(hour => `${hour}:00hr`).join(" - ");
        }
        $("#reserva_mensaje").text(mensaje);

        $("#guardarReserva").prop('disabled', !selectedDay || selectedHours.length === 0);
        $("#pagarReserva").prop('disabled', !selectedDay || selectedHours.length === 0);

    }

    function clearSelectedHours() {
        $(".hour_item").removeClass("selected");
        selectedHours = [];
        updateReservaMensaje();
    }

});
