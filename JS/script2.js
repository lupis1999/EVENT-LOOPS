// =============================
// Base de datos (JSON)
// =============================
let biblioteca = {
    libros: [
        {
            titulo: "Cien Años de Soledad",
            autor: "Gabriel García Márquez",
            genero: "Novela",
            disponible: true
        },
        {
            titulo: "Don Quijote de la Mancha",
            autor: "Miguel de Cervantes",
            genero: "Novela",
            disponible: false
        },
        {
            titulo: "El Principito",
            autor: "Antoine de Saint-Exupéry",
            genero: "Fábula",
            disponible: true
        }
    ]
};

// =============================
// Leer JSON (Callback)
// =============================
function leerDatos(callback){

    console.log("Leyendo datos...");

    setTimeout(function(){

        callback(biblioteca);

    },1000);

}

// =============================
// Escribir JSON (Callback)
// =============================
function escribirDatos(datos, callback){

    console.log("Guardando cambios...");

    setTimeout(function(){

        biblioteca = datos;

        callback();

    },1000);

}

// =============================
// Mostrar inventario
// =============================
function consultarInventario(){

    leerDatos(function(datos){

        const contenedor = document.getElementById("inventario");

        contenedor.innerHTML="";

        datos.libros.forEach(function(libro){

            contenedor.innerHTML += `
                <div class="libro">
                    <h3>${libro.titulo}</h3>

                    <p><strong>Autor:</strong> ${libro.autor}</p>

                    <p><strong>Género:</strong> ${libro.genero}</p>

                    <p class="${libro.disponible ? 'disponible':'prestado'}">
                        ${libro.disponible ? "Disponible":"Prestado"}
                    </p>
                </div>
            `;

        });

    });

}

// =============================
// Agregar libro
// =============================
function agregarLibro(){

    leerDatos(function(datos){

        const nuevoLibro = {
            titulo:"Harry Potter",
            autor:"J.K. Rowling",
            genero:"Fantasía",
            disponible:true
        };

        datos.libros.push(nuevoLibro);

        escribirDatos(datos,function(){

            alert("Libro agregado correctamente.");

            consultarInventario();

        });

    });

}

// =============================
// Cambiar disponibilidad
// =============================
function cambiarDisponibilidad(){

    leerDatos(function(datos){

        const titulo = prompt("Ingrese el título del libro:");

        const libro = datos.libros.find(function(item){

            return item.titulo.toLowerCase() === titulo.toLowerCase();

        });

        if(libro){

            libro.disponible = !libro.disponible;

            escribirDatos(datos,function(){

                alert("Disponibilidad actualizada.");

                consultarInventario();

            });

        }else{

            alert("Libro no encontrado.");

        }

    });

}