let ventanaFlotanteAbierta = null; // Variable para rastrear la ventana flotante abierta

function abrirModal(tipo) {
    // Si la ventana flotante está abierta y es del mismo tipo, la cerramos
    if (ventanaFlotanteAbierta && ventanaFlotanteAbierta.dataset.tipo === tipo) {
        ventanaFlotanteAbierta.remove();
        ventanaFlotanteAbierta = null;
        return;
    }

    // Si no hay ventana flotante abierta o es de otro tipo, la creamos
    const frase = obtenerFrasePorTipo(tipo);
    const ventanaFlotante = document.createElement('div');
    ventanaFlotante.classList.add('ventana-flotante');
    ventanaFlotante.dataset.tipo = tipo; 
    ventanaFlotante.textContent = frase;
    document.body.appendChild(ventanaFlotante);
    
    ventanaFlotanteAbierta = ventanaFlotante;
}

function obtenerFrasePorTipo(tipo) {
    switch (tipo) {
        case 'manual':
            return 'Empezaremos para ver cuanta energía es la que consumiras mensualmente, elegiremos el mes con mayor gasto electrico para poder abastecer tu sistema fotovoltaico en la situación más complicada de tu consumo, este dato podras verlo en tu recibo de luz que a continuación te mostraremos un ejemplo en la sección de energía, una vez tengas el dato solicitado, colocalo tal como esta en la casilla que dice energia consumida';
        case 'ventajas':
            return 'Las ventajas de los sistemas fotovoltaicos, es que ofrecen una energía limpia y renovable, reduciendo nuestra dependencia de combustibles fósiles y contribuyendo a un futuro más sostenible y respetuoso con el medio ambiente. unque la instalación inicial puede ser costosa, a largo plazo, los sistemas fotovoltaicos pueden generar ahorros significativos en las facturas de energía al proporcionar electricidad gratuita o a bajo costo durante su vida útil, que suele ser de varias décadas.';
        case 'informacion':
            return 'La energia fotovoltaica se utiliza con el fin de economizar tu consumo electrico y ayudar, sin embargo esta energia se divide en 3 tipos el sistema off grid, el sistema on grid y el sistema hibrido; en esta ocasión trabajaremos con el sistema off grid: Este sistema es un kit fotovoltaico conectado 100% a baterias, este arreglo de baterias debe ser suficiente para cubrir sus necesidades energeticas. A continuación mostraremos arreglos fotovoltaicos en 12, 24 y 48v, estos arreglos pueden brindar una gran ventaja en arreglos fotovoltaicos.';
        default:
            return '';
    }
}

// Cerrar la ventana flotante al hacer clic en ella
document.addEventListener('click', function(event) {
    if (ventanaFlotanteAbierta && event.target === ventanaFlotanteAbierta) {
        ventanaFlotanteAbierta.remove();
        ventanaFlotanteAbierta = null;
    }
});