
// import productos from "../Model/data.json";
import {validacionParcialProducto, validacionProducto} from "../Validators/productoSchema.js";
import { productoModel } from "../Model/producto.js"; 

export class productoControlador{
        //Trae todos los productos de la distribuidora
    static async listaProductos(req, res){
    const productos = await productoModel.traerProductos();
    productos
        ? res
            .status(200)
            .json({info:{status: 200, message: "ok"}, data: productos})
        :res
            .status(404)
            .json({info:{status: 404, message: "No se encontraron productos en la db"}});
    };
     //Filtra por categoria
     static async categoriaBuscada (req,res){
        const {Categoria} = req.query;
        const categoriaFiltrada = await productoModel.categoriaBuscada(Categoria);
        if (!categoriaFiltrada){
            res.json({info:{status:404, message: "No hay producto con esa categoria."}});
        }else{
            res.json({info:{status:200, message: "ok"}, data: categoriaFiltrada});
        }
    }

       //Filtra por id
       static async idBuscado(req,res){
        const {id} = req.params;
        const idFiltrado = await productoModel.idBuscado(id);
        if (!idFiltrado){
            res.json({info:{status:404, message: "No hay producto con ese id."}});
        }else{
            res.json({info:{status:200, message: "ok"}, data: idFiltrado});
        }
    };
        //Crea un nuevo producto
    static async productoCreado(req,res){
        const {id, Categoria, Nombre_del_producto, Sin_tacc, 
            Premium, Precio, Cantidad_en_stock, Vencimiento, Imagenes} = req.body;
        const validationResult = validacionProducto({
            id: Number(id),
            Categoria,
            Nombre_del_producto, 
            Sin_tacc, 
            Premium, 
            Precio: Number(Precio), 
            Cantidad_en_stock: Number(Cantidad_en_stock), 
            Vencimiento,
            Imagenes
        });
        if(validationResult.error){
            res.status(422).json({info:{status: 422, message: "Error de validacion"}, errors: validationResult.error.issues})
        }
        const nuevoProducto = await productoModel.productoCreado({...validationResult.data});
        
        nuevoProducto ?
        res.status(201).json({info:{status:201, message: "Producto creado"}, data: {...validationResult.data}}) 
        :
        res.status(500).json({info:{status: 500, message: "Error interno de servidor."}});
    }

    
     // Actualiza datos
    static async productoModificado(req, res) {
        const {id} = req.params;
        console.log(id);
     
        const isProducto = await productoModel.idBuscado(id);
        console.log(isProducto);
        if(isProducto === null){
            return res.status(404).json({info:{status: 404, message: "Producto no encontrado."}});
        }
        const validationResult = validacionParcialProducto(req.body);
        if(validationResult.error){
            res.status(422).json({info:{status: 422, message: "Error de validacion"}, 
            errors: validationResult.error.issues});
        }
        if(!Object.keys(validationResult.data).length){
            return res.status(422).json({info:{status: 422, message: "No incluyo ningun campo valido."}});

        }
        const productoModificado = await productoModel.productoModificado(id, validationResult.data)
        
        productoModificado ?
        res.status(200).json({info: {status: 200, message: "Datos modificados."}})
        :
        res.status(500).json({info: {status: 500, message: "Error interno de servidor."}})
    }
 
   


    static async borrarPorId(req,res){
        const {id} = req.params;
        const info = await productoModel.borrarPorId(id);
        if(info > 0){
            res.status(200).json ({info:{status:200, message: "Producto borrado"}})
        }else{
            res.status(404).json({info:{status: 404, message: "Producto no encontrado."}});
        }
    }
};


