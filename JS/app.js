const express = require("express");
const fs = require("fs");

const app = express();

const PORT = 3000;


// Configuración

app.use(express.json());

app.use(express.static("public"));


// Archivo donde se guardan los planetas

const archivo = "./data/planetas.json";


// Leer planetas

function obtenerPlanetas(){

    const datos = fs.readFileSync(archivo);

    return JSON.parse(datos);

}


// Guardar planetas

function guardarPlanetas(planetas){

    fs.writeFileSync(
        archivo,
        JSON.stringify(planetas,null,2)
    );

}



// Ruta principal

app.get("/planetas",(req,res)=>{

    const planetas = obtenerPlanetas();

    res.json(planetas);

});




// Registrar planeta

app.post("/planetas",(req,res)=>{


    const planetas = obtenerPlanetas();


    const nuevoPlaneta = {

        id: Date.now(),

        nombre:req.body.nombre,

        descripcion:req.body.descripcion,

        descubierto:req.body.descubierto

    };


    planetas.push(nuevoPlaneta);


    guardarPlanetas(planetas);


    res.json({

        mensaje:"🌎 Planeta registrado correctamente",

        planeta:nuevoPlaneta

    });


});




// Buscar planetas

app.get("/buscar/:nombre",(req,res)=>{


    const planetas = obtenerPlanetas();


    const resultado = planetas.filter(planeta =>

        planeta.nombre
        .toLowerCase()
        .includes(
            req.params.nombre.toLowerCase()
        )

    );


    res.json(resultado);


});




// Eliminar planeta

app.delete("/planetas/:id",(req,res)=>{


    let planetas = obtenerPlanetas();


    planetas = planetas.filter(planeta =>

        planeta.id != req.params.id

    );


    guardarPlanetas(planetas);


    res.json({

        mensaje:"🚀 Planeta eliminado"

    });


});




// Servidor

app.listen(PORT,()=>{

    console.log(
        `Servidor activo en http://localhost:${PORT}`
    );

});