document.addEventListener("DOMContentLoaded", function() {
    const whatsappLink = document.getElementById('whatsappLink');
    const whatsappVentana = document.getElementById('whatsapp');
    const cerrarVentana = document.getElementById('cerrarVentana');

    whatsappLink.addEventListener('click', function(event) {
        event.preventDefault();
        whatsappVentana.style.display = whatsappVentana.style.display === 'none' ? 'block' : 'none';
    });

    cerrarVentana.addEventListener('click', function(event) {
        event.preventDefault();
        whatsappVentana.style.display = 'none';
    });
});