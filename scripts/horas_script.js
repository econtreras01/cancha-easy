$(document).ready(function () {
    var selectedHours = [];
    var selectedDay = null;

    // Agregar horas disponibles
    for (let i = 10; i <= 19; i++) {
        $(".hours_container").append(`<div class="hour_item" id="hour_${i}" data-hour="${i}">${i}:00</div>`);
    }

    // Manejar la selección de horas
    $(".hour_item").click(function () {
        if ($(this).hasClass("disabled") || !selectedDay || isPastHour($(this).data("hour"))) return; // No permitir selección de hora si no se ha seleccionado un día o si es una hora pasada
        $(this).toggleClass("selected");
        var hour = $(this).data("hour");
        var index = selectedHours.indexOf(hour);
        if (index === -1) {
            selectedHours.push(hour);
        } else {
            selectedHours.splice(index, 1);
        }
        updateReservaMensaje();
    });

    // Función para verificar si una hora es pasada
    function isPastHour(hour) {
        var now = new Date();
        var currentHour = now.getHours();
        var selectedDate = new Date(selectedDay);
        if (now.getDate() === selectedDate.getDate() && now.getMonth() === selectedDate.getMonth() && now.getFullYear() === selectedDate.getFullYear()) {
            return hour <= currentHour;
        }
        return false;
    }

    // Función para actualizar el mensaje de reserva
    function updateReservaMensaje() {
        var mensaje = "RESERVA ";
        if (selectedDay) {
            var fecha = new Date(selectedDay);
            var mes = monthName[fecha.getMonth()];
            var año = fecha.getFullYear();
            var dia = fecha.getDate();
            mensaje += `${mes} ${año} día ${dia} : `;
        }
        if (selectedHours.length > 0) {
            selectedHours.sort(function (a, b) {
                return a - b;
            });
            mensaje += selectedHours.map(hour => `${hour}:00hr`).join(" - ");
        }
        $("#reserva_mensaje").text(mensaje);
    }

    // Función para guardar la selección de horas
    $("#guardar_seleccion").click(function () {
        // Aquí puedes enviar los datos al servidor o hacer lo que necesites con las horas seleccionadas
        console.log("Día seleccionado:", selectedDay);
        console.log("Horas seleccionadas:", selectedHours);
    });

    // Función para limpiar las horas seleccionadas
    function clearSelectedHours() {
        $(".hour_item").removeClass("selected");
        selectedHours = [];
        updateReservaMensaje(); // Actualizar el mensaje de reserva después de limpiar las horas
    }

    // Establecer el evento de clic para cada día del calendario
    $(".calendar-day").click(function () {
        if ($(this).hasClass("disabled")) return; // Salir si el día está deshabilitado
        $(".calendar-day").removeClass("selected");
        $(this).addClass("selected");
        selectedDay = new Date(year, month, parseInt($(this).text()));
        clearSelectedHours(); // Limpiar las horas seleccionadas al cambiar de día
        updateReservaMensaje(); // Actualizar el mensaje de reserva después de seleccionar un nuevo día
    });
});
