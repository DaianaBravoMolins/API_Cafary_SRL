import { Router } from "express";
export const router = Router();

import { productoControlador} from "../Controllers/productos.js";
import {upload} from "../multer.js"
import { respuestaB } from "../Controllers/contacto.js";

// Traer lista de todos los productos:
router.get("/", productoControlador.listaProductos);
//Buscar productos por Categoria:
router.get("/search", productoControlador.categoriaBuscada); 

//Traer producto por su id:
router.get("/:id", productoControlador.idBuscado); 

//Crear un nuevo producto: 
router.post("/", productoControlador.productoCreado);

// Modifica en forma "parcial" algunos datos de un producto ya cargado: 
router.patch("/:id", productoControlador.productoModificado);

// Para borrar un producto:
router.delete("/:id", productoControlador.borrarPorId);



//intento cargar lo de la imagen aca:
router.post("/cargaImagen", upload.single("imagen"), respuestaB);
 

