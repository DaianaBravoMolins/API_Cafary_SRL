// 1ro abrir xammp para que cargue la db y luego en termianl:  "npm run dev" para cargar proyecto !!!

import express from "express";
const app = express() ;
import cors from "cors";

import {router as productosRouter} from "./Routes/productos.js";
import{ router as contactosRouter} from "./Routes/contactos.js";


import "dotenv";
//para recibir info de un formulario en formato objeto:
app.use(express.urlencoded({extended: true}));
//Prueba de conexion con la db
// import {db} from "./Model/producto.js";
// const result = await db.query("select * from productos_de_havanna");
// console.log(result);
app.use('public', express.static('/Images'));
app.disable("X-Powered-By");

app.use(express.json());
app.use(cors());
const puerto = process.env.port || 4000;


app.get("/",(req,res)=>{
    res.json({info:{status: "ok", message: "Corriendo"}})
});

app.use("/productos", productosRouter);

app.use("/contactos", contactosRouter);

//Error cuando se anota mal la url:
// app.use((req,res,next)=>{
//     let error = new Error("recsource not found");
//     error.status = 404;
//     next (error);
// });


app.listen (puerto, (err)=>{
    if(err){
        console.log(err);
    }else
        (console.log(`Corriendo en puerto http://localhost:${puerto}`));
    }   
); 
