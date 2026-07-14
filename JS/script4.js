// Mesas disponibles en el restaurante
let mesasDisponibles = 5;

// Mostrar mensajes en pantalla
function mostrarMensaje(texto) {
    document.getElementById("resultado").innerHTML += texto + "<br>";
}

// Verificar disponibilidad
function verificarDisponibilidad(mesasSolicitadas) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (mesasSolicitadas <= mesasDisponibles) {

                resolve("✅ Hay mesas disponibles.");

            } else {

                reject("❌ No hay suficientes mesas disponibles.");

            }

        }, 1500);

    });

}

// Simular envío del correo
function enviarConfirmacionReserva(nombreCliente) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            let correoEnviado = Math.random() > 0.3;

            if (correoEnviado) {

                resolve(`📧 Correo enviado correctamente a ${nombreCliente}.`);

            } else {

                reject("❌ Error al enviar el correo de confirmación.");

            }

        }, 1500);

    });

}

// Función principal
async function hacerReserva(nombreCliente, mesasSolicitadas) {

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    try {

        mostrarMensaje("👤 Cliente: " + nombreCliente);
        mostrarMensaje("🪑 Mesas solicitadas: " + mesasSolicitadas);
        mostrarMensaje("⏳ Verificando disponibilidad...");

        const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);

        mostrarMensaje(disponibilidad);

        mesasDisponibles -= mesasSolicitadas;

        mostrarMensaje("🎉 Reserva confirmada.");
        mostrarMensaje("📊 Mesas restantes: " + mesasDisponibles);

        mostrarMensaje("📨 Enviando correo...");

        const correo = await enviarConfirmacionReserva(nombreCliente);

        mostrarMensaje(correo);

        mostrarMensaje("<br>✅ Proceso finalizado correctamente.");

    } catch (error) {

        mostrarMensaje("<span style='color:red; font-weight:bold;'>" + error + "</span>");

    }

}

// Obtener datos del formulario
function iniciarReserva() {

    const nombre = document.getElementById("nombre").value;
    const mesas = parseInt(document.getElementById("mesas").value);

    if (nombre === "" || isNaN(mesas)) {

        document.getElementById("resultado").innerHTML =
            "<span style='color:red;'>⚠ Completa todos los campos.</span>";

        return;
    }

    hacerReserva(nombre, mesas);

}