import {contactoModel } from "../Model/contacto.js"; 
import { validacionContacto, validacionParcialContacto } from "../Validators/productoSchema.js";

export class contactoControlador{
    static async Contactos(req, res){
        const Contactos = await contactoModel.Contactos();
        Contactos
            ? res
                .status(200)
                .json({info:{status: 200, message: "Contactos obtenidos."}, data: Contactos})
            :res
                .status(404)
                .json({info:{status: 404, message: "No se encontraron contactos en la db"}});
        }
     
    static async contactoCreado(req, res){
        const {Mail, Mensaje, Categoria} = req.body;
        console.log(req.body)
        const validationResult = validacionContacto({
            Mail,
            Mensaje,
            Categoria
        });
        if(validationResult.error){
            res.status(422).json({info:{status: 422, messagge: "Error de validacion"}, errors: validationResult.error.issues})
        }
        const nuevoContacto = await contactoModel.contactoCreado({...validationResult.data});
    
        nuevoContacto ?
        res.status(201).json({info:{status:201, messagge:"contacto creado"}, data: {...validationResult.data}})
        :
        res.status(500).json({info:{status: 500, messagge: "Error interno de servidor."}});
    }

        static async buscarPersona(req,res){
            const {Mail} = req.params;
            const mailFiltrado = await contactoModel.buscarPersona(Mail);
            if (!mailFiltrado){
                res.json({info:{status:404, messagge: "No existe ese mail."}});
            }else{
                res.json({info:{status:200, messagge: "ok"}, data: mailFiltrado});
            }
        };

        static async contactoModificado(req, res) {
            const {Mail} = req.params;
            console.log(Mail);
            const isContacto = await contactoModel.buscarPersona(Mail);
            console.log(isContacto);
            if(isContacto === null){
                return res.status(404).json({info:{status: 404, message: "Contacto no encontrado."}});
            }

            const validationResult = validacionParcialContacto(req.body);
            if(validationResult.error){
                res.status(422).json({info:{status: 422, message: "Error de validacion"}, 
                errors: validationResult.error.issues});
            }
            if(!Object.keys(validationResult.data).length){
                return res.status(422).json({info:{status: 422, message: "No incluyo ningun campo valido."}});
    
            }
            const contactoModificado = await contactoModel.contactoModificado(Mail, validationResult.data)
            
            contactoModificado ?
            res.status(200).json({info: {status: 200, message: "Datos modificados."}})
            :
            res.status(500).json({info: {status: 500, message: "Error interno de servidor."}})
        }
         

    static async borrarContacto(req, res){
        const {Mail} = req.params;
        const info = await contactoModel.borrarContacto(Mail);
        if(info > 0){
            res.status(200).json ({info:{status:200, message: "Contacto  borrado"}})
        }else{
            res.status(404).json({info:{status: 404, message: "Contacto no encontrado."}});
        }
    }

}

//Para cargar imagen al proyecto:
const respuestaB=(req,res)=>{
    console.log(req.file);
    console.log(req.body);
    res.send({info:"Imagen cargada exitosamente"});
}


export{respuestaB}; 
