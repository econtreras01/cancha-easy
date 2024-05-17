$(document).ready(function () {
    let selectedHours = [];
    let selectedDay = null;

    // Agregar horas disponibles
    for (let i = 10; i <= 19; i++) {
        $(".hours_container").append(`<div class="hour_item" id="hour_${i}" data-hour="${i}">${i}:00</div>`);
    }

    // Controlador de eventos para el botón "Guardar Reserva"
    $("#guardarReserva").click(function () {
        // Guardar la reserva
        const fechas = JSON.parse(localStorage.getItem("fechas")) || []
        console.log(selectedDay)
        localStorage.setItem("reserva",selectedDay.toString())
        fechas.push(selectedDay)
        localStorage.setItem("fechas",JSON.stringify(fechas))
        window.location.href = "reservalista.html"
    });

    // Establecer el evento de clic para cada día del calendario
    $(".calendar-day").click(function () {
        if ($(this).hasClass("disabled")) return; // Salir si el día está deshabilitado
        $(".calendar-day").removeClass("selected");
        $(this).addClass("selected");
        selectedDay = new Date(year, month, parseInt($(this).text()));
        clearSelectedHours(); // Limpiar las horas seleccionadas al cambiar de día
        updateReservaMensaje(); // Actualizar el mensaje de reserva después de seleccionar un nuevo día
    });

    // Manejar la selección de horas
    $(".hour_item").click(function () {
        if ($(this).hasClass("disabled") || !selectedDay || isPastHour($(this).data("hour"))) return; // No permitir selección de hora si no se ha seleccionado un día o si es una hora pasada
        $(this).toggleClass("selected");
        let hour = $(this).data("hour");
        let index = selectedHours.indexOf(hour);
        if (index === -1) {
            selectedHours.push(hour);
        } else {
            selectedHours.splice(index, 1);
        }
        selectedDay.setHours(hour)
        updateReservaMensaje();
    });

    // Función para verificar si una hora es pasada
    function isPastHour(hour) {
        let now = new Date();
        let currentHour = now.getHours();
        let selectedDate = new Date(selectedDay);
        if (now.getDate() === selectedDate.getDate() && now.getMonth() === selectedDate.getMonth() && now.getFullYear() === selectedDate.getFullYear()) {
            return hour <= currentHour;
        }
        return false;
    }

    // Función para actualizar el mensaje de reserva
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

        if (!selectedDay || selectedHours.length === 0){
            $("#guardarReserva").prop('disabled', true);
        } else {
            $("#guardarReserva").prop('disabled', false);

        }
    }



    // Función para limpiar las horas seleccionadas
    function clearSelectedHours() {
        $(".hour_item").removeClass("selected");
        selectedHours = [];
        updateReservaMensaje(); // Actualizar el mensaje de reserva después de limpiar las horas
    }

});
