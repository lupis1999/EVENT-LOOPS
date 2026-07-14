let contadorPedidos = 1;

// Contenedor de pedidos
const listaPedidos = document.getElementById("listaPedidos");

// Botón
const boton = document.getElementById("btnPedido");

// Evento
boton.addEventListener("click", recibirPedido);

// ===============================
// 1. Recibir nuevo pedido
// ===============================
function recibirPedido(){

    const id = contadorPedidos++;

    // Crear pedido
    const pedido = {
        id,
        estado: "En Proceso"
    };

    // Mostrar en pantalla
    mostrarPedido(pedido);

    // Procesar de manera asíncrona
    prepararPedido(pedido);

}


// ===============================
// 2. Mostrar pedido
// ===============================
function mostrarPedido(pedido){

    const div = document.createElement("div");

    div.className = "pedido";

    div.id = `pedido-${pedido.id}`;

    div.innerHTML = `
        <h3>Pedido #${pedido.id}</h3>
        <p class="estado proceso">
            Estado: ${pedido.estado}
        </p>
    `;

    listaPedidos.appendChild(div);

}


// ===============================
// 3. Actualizar estado visual
// ===============================
function actualizarPedido(pedido){

    const div = document.getElementById(`pedido-${pedido.id}`);

    div.innerHTML = `
        <h3>Pedido #${pedido.id}</h3>
        <p class="estado ${pedido.estado==="Completado" ? "completado":"proceso"}">
            Estado: ${pedido.estado}
        </p>
    `;

}


// ===============================
// 4. Promise + setTimeout
// ===============================
function simularPreparacion(pedido){

    return new Promise((resolve)=>{

        // Tiempo aleatorio entre 2 y 6 segundos
        const tiempo = Math.floor(Math.random()*4000)+2000;

        setTimeout(()=>{

            pedido.estado = "Completado";

            resolve(pedido);

        }, tiempo);

    });

}


// ===============================
// 5. async/await
// ===============================
async function prepararPedido(pedido){

    console.log(`Preparando pedido ${pedido.id}...`);

    const pedidoListo = await simularPreparacion(pedido);

    actualizarPedido(pedidoListo);

    console.log(`Pedido ${pedido.id} completado.`);

}