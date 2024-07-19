$(document).ready(function () {
    const estaAutenticado = localStorage.getItem('estáAutenticado');
    
    if (estaAutenticado !== 'true') {
        window.location.href = 'index.html';
    }
    
    $('#cerrarSesion').on('click', function(event) {
        event.preventDefault();
        
        localStorage.clear();
        
        window.location.href = 'index.html';
      });

});

  