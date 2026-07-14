
// Importamos Zod desde la librería cargada en HTML
const { z } = Zod;


// Crear esquema de validación

const usuarioSchema = z.object({

    nombre: z
        .string()
        .min(3, "El nombre debe tener mínimo 3 caracteres."),


    correo: z
        .string()
        .email("El correo electrónico no es válido."),


    password: z
        .string()
        .min(8, "La contraseña debe tener mínimo 8 caracteres.")
        .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula.")
        .regex(/[0-9]/, "Debe contener al menos un número.")

});



// Obtener formulario

const formulario = document.getElementById("registroForm");

const mensaje = document.getElementById("mensaje");



// Evento enviar formulario

formulario.addEventListener("submit", function(e){

    e.preventDefault();


    const datos = {

        nombre: document.getElementById("nombre").value,

        correo: document.getElementById("correo").value,

        password: document.getElementById("password").value

    };



    // Validación con Zod

    const resultado = usuarioSchema.safeParse(datos);



    if(!resultado.success){


        mensaje.className="error";


        mensaje.innerHTML="";


        resultado.error.errors.forEach(error => {

            mensaje.innerHTML += 
            "❌ " + error.message + "<br>";

        });


        return;

    }



    // Si pasa todas las validaciones

    mensaje.className="exito";

    mensaje.innerHTML=
    "✅ Registro exitoso. Datos enviados correctamente.";


    formulario.reset();


});