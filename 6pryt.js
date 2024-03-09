document.addEventListener("DOMContentLoaded", function() {
    const HSP = 3.97;
    const PD = 0.5;
    const DA = 1.2;
    const Ahbat= 200;
    const nsist = 0.75;
    const fs = 1.2;
    const pot = 152;
    const ninv = 0.85;
    const voc12= 21.6;
    const isc12= 691.6;
    const voc24= 43.2;
    const isc24= 345.8;
    const voc48= 86.4;
    const isc48= 172.9;
    

    document.getElementById('dato').addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener el valor del campo monto_energia
        const montoEnergia = parseFloat(document.getElementById('monto_energia').value);
        // Mostrar el valor en el div "resultado" dentro de "energia"
        const resultadoE = document.getElementById('resultado');
        resultadoE.textContent = `Monto de energía diario: ${(montoEnergia / 30) * 1000} Wh`;
        const energiaDiaria = (montoEnergia / 30) * 1000;

        // Calcular y mostrar los resultados para 12V
        const r12V = calcularResultados(12, montoEnergia, energiaDiaria);
        mostrarResultados('result_12V', r12V);

        // Calcular y mostrar los resultados para 24V
        const r24V = calcularResultados(24, montoEnergia, energiaDiaria);
        mostrarResultados('result_24V', r24V);

        // Calcular y mostrar los resultados para 48V
        const r48V = calcularResultados(48, montoEnergia, energiaDiaria);
        mostrarResultados('result_48V', r48V);
    });

    function calcularResultados(voltage, montoEnergia, energiaDiaria) {
        let cantidadPaneles;
        let cantidadBaterias;
        let potenciaInversor;
        

        // Cálculos específicos para cada voltaje utilizando switch
        switch (voltage) {
            case 12:
                cantidadPaneles = Math.ceil((energiaDiaria*fs/HSP) / pot);
                cantidadBaterias = Math.ceil(((energiaDiaria * DA) / (voltage * PD))/Ahbat);
                potenciaInversor = Math.ceil(pot*cantidadPaneles*1.25);
                cantidadControladores = Math.ceil(pot*cantidadPaneles*1.25);
                vocControlador=voc12;
                iscControlador=isc12;
                break;
            case 24:
                cantidadPaneles = Math.ceil((energiaDiaria*fs/HSP) / pot);
                if (cantidadPaneles % 2 !== 0) {
                    cantidadPaneles += 1; // Incrementar en 1 si es impar para hacerlo par
                }
                cantidadBaterias = Math.ceil(2*(((energiaDiaria * DA) / (voltage * PD))/Ahbat));
                potenciaInversor = Math.ceil(pot*cantidadPaneles*1.25);
                cantidadControladores = Math.ceil(pot*cantidadPaneles*1.25);
                vocControlador=voc24;
                iscControlador=isc24;
                break;
            case 48:
                cantidadPaneles = Math.ceil((energiaDiaria*fs/HSP) / pot);
                if (cantidadPaneles % 4 !== 0) {
                    cantidadPaneles = Math.ceil(cantidadPaneles / 4) * 4; // Redondear hacia arriba y multiplicar por 4
                }
                cantidadBaterias = Math.ceil(4*(((energiaDiaria * DA) / (voltage * PD))/Ahbat));
                potenciaInversor = Math.ceil(pot*cantidadPaneles*1.25);
                cantidadControladores = Math.ceil(pot*cantidadPaneles*1.25);
                vocControlador=voc24;
                iscControlador=isc24;
                break;
            default:
                // Manejo de caso por defecto
                break;
            }
            // Retorna un objeto con los resultados
            return {
                voltaje: voltage,
                cantidadPaneles: cantidadPaneles,
                cantidadBaterias: cantidadBaterias,
                potenciaInversor: potenciaInversor,
                cantidadControladores: cantidadControladores,
                vocControlador:vocControlador,
                iscControlador: iscControlador,
                
                
            };
        }

        
        function mostrarResultados(idElemento, resultados) {
            const elemento = document.getElementById(idElemento);
            elemento.innerHTML = `
                <h3>Resultados para ${resultados.voltaje}V:</h3>
                <p>Demanda de paneles con 200W: ${resultados.cantidadPaneles}</p>
                <p>Demanda de baterías de 200Ah: ${resultados.cantidadBaterias}</p>
                <p>Potencia del inversor (W): ${resultados.potenciaInversor}</p>
                <p>Potencia del controlador (W): ${resultados.cantidadControladores}</p>
                <p>Voc de controlador: ${resultados.vocControlador}</p>
                <p>isc de controlador: ${resultados.iscControlador}</p>
            `;
        }
    });
