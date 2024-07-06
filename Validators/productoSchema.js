import z from "zod";
const productoSchema = z.object({
    id: z.number().positive(),
    Categoria: z.string({required_error: "El campo es requerido"}),
    Nombre_del_producto: z.string({required_error: "El campo es requerido"}),
    Sin_tacc: z.string({required_error: "El campo es requerido"}),
    Premium: z.string({required_error: "El campo es requerido"}),
    Precio: z.number().int().min(1800).positive(),
    Cantidad_en_stock: z.number().int().positive(),
    Vencimiento: z.string(),
    Imagenes: z.string()
});

export function validacionProducto(object){
    return productoSchema.safeParse(object);
}

export function validacionParcialProducto(object){
    return productoSchema.partial().safeParse(object);
}

const contactoSchema = z.object({
    Mail: z.string({required_error: "El campo es requerido"}),
    Mensaje: z.string({required_error: "El campo es requerido"}),
    Categoria: z.string({required_error: "El campo es requerido"}),
});


export function validacionContacto(object){
    return contactoSchema.safeParse(object);
}

export function validacionParcialContacto(object){
    return contactoSchema.partial().safeParse(object);
}
