
function guardarReserva(deporte, dia, horas) {
    var reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    
    var reserva = {
        deporte: deporte,
        dia: dia,
        horas: horas
    };
    reservas.push(reserva);

    localStorage.setItem('reservas', JSON.stringify(reservas));
}