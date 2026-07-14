const API_URL = "https://rickandmortyapi.com/api/character";

const container = document.getElementById("data-container");

// ================================
// Mostrar personajes
// ================================
function mostrarPersonajes(personajes){

    container.innerHTML = "";

    personajes.forEach(personaje => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <img src="${personaje.image}" alt="${personaje.name}">
            <h3>${personaje.name}</h3>
            <p>${personaje.species}</p>
            <p><strong>${personaje.status}</strong></p>
        `;

        container.appendChild(card);

    });

}

// ================================
// Obtener datos con Fetch
// ================================
async function obtenerConFetch(){

    try{

        const respuesta = await fetch(API_URL);

        const datos = await respuesta.json();

        mostrarPersonajes(datos.results);

    }catch(error){

        console.error(error);

        container.innerHTML = "<p>Error al obtener datos con Fetch.</p>";

    }

}

// ================================
// Obtener datos con Axios
// ================================
async function obtenerConAxios(){

    try{

        const respuesta = await axios.get(API_URL);

        mostrarPersonajes(respuesta.data.results);

    }catch(error){

        console.error(error);

        container.innerHTML = "<p>Error al obtener datos con Axios.</p>";

    }

}

// Eventos de los botones
document.getElementById("fetchBtn").addEventListener("click", obtenerConFetch);

document.getElementById("axiosBtn").addEventListener("click", obtenerConAxios);