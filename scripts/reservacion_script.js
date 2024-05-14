// Función para guardar la reserva en una lista
function guardarReserva(deporte, dia, horas) {
    // Obtener la lista de reservas del localStorage
    var reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    
    // Crear un objeto de reserva
    var reserva = {
        deporte: deporte,
        dia: dia,
        horas: horas
    };

    // Agregar la reserva a la lista
    reservas.push(reserva);

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('reservas', JSON.stringify(reservas));
}