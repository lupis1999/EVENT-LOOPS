const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const edad = document.getElementById("edad").value;
    const telefono = document.getElementById("telefono").value.trim();
    const horario = document.getElementById("horario").value;
    const documento = document.getElementById("documento").files;

    const intereses = document.querySelectorAll("input[name='intereses']:checked");

    const mensaje = document.getElementById("mensaje");

    mensaje.className="";
    mensaje.innerHTML="";

    // VALIDACIÓN 1
    if(nombre.length < 3){

        mensaje.classList.add("error");
        mensaje.innerHTML="❌ El nombre debe tener al menos 3 caracteres.";
        return;

    }

    // VALIDACIÓN 2
    const correoValido=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!correoValido.test(correo)){

        mensaje.classList.add("error");
        mensaje.innerHTML="❌ Ingrese un correo electrónico válido.";
        return;

    }

    // VALIDACIÓN 3
    if(edad < 18){

        mensaje.classList.add("error");
        mensaje.innerHTML="❌ Debe ser mayor de edad para registrarse.";
        return;

    }

    // VALIDACIÓN 4
    const telefonoValido=/^[0-9]{10}$/;

    if(!telefonoValido.test(telefono)){

        mensaje.classList.add("error");
        mensaje.innerHTML="❌ El teléfono debe tener exactamente 10 dígitos.";
        return;

    }

    // VALIDACIÓN 5
    if(horario===""){

        mensaje.classList.add("error");
        mensaje.innerHTML="❌ Seleccione un horario.";
        return;

    }

    // VALIDACIÓN 6
    if(intereses.length===0){

        mensaje.classList.add("error");
        mensaje.innerHTML="❌ Seleccione al menos un interés.";
        return;

    }

    // VALIDACIÓN 7
    if(documento.length>0){

        const archivo=documento[0];

        if(archivo.size > 2 * 1024 * 1024){

            mensaje.classList.add("error");
            mensaje.innerHTML="❌ El archivo no debe superar los 2 MB.";
            return;

        }

    }

    mensaje.classList.add("exito");
    mensaje.innerHTML="✅ Registro realizado correctamente.";

    formulario.reset();

});