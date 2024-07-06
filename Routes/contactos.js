import { Router } from "express";
export const router = Router();

import { contactoControlador,respuestaB} from "../Controllers/contacto.js";
import {upload} from "../multer.js";

//GET: Para que se muestren todos los contactos cargados en la DB.
router.get("/", contactoControlador.Contactos);

//POST: Para cargar contactos nuevos en la DB al completarse el formulario. DONE 
router.post("/", contactoControlador.contactoCreado);

//Get: para obtener datos de alguien de acuerdo a su mail.
router.get("/:Mail", contactoControlador.buscarPersona)

//Delete: Para borrar algun registro de la gente que nos contacto:
router.delete("/:Mail", contactoControlador.borrarContacto);

//PATCH: Para hacer modificaciones de los datos guardados:
router.patch("/:Mail", contactoControlador.contactoModificado);

//para cargar una imagen modificando su nombre de manera que este sea unico:
router.post("/cargaImagen", upload.single("imagen"), respuestaB);