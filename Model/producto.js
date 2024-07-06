import {db} from "../dbConnection.js";

export class productoModel {
    static async traerProductos(){
        const [productos, _info] = await db.query(
            `SELECT ID, Categoria, Nombre_del_producto, Sin_tacc, Premium, Precio, 
            Cantidad_en_stock, Vencimiento, Imagenes 
            from productos_de_havanna`
        );
        return productos.length ? productos : null ;
    };

    static async categoriaBuscada(Categoria){
        const [productos, _info] = await db.query(
            `SELECT ID, Categoria, Nombre_del_producto, Sin_tacc, Premium, Precio, 
            Cantidad_en_stock, Vencimiento, Imagenes 
            from productos_de_havanna where Categoria = ?`, [Categoria] 
        );
        return productos.length ? productos : null ;
    };
     
    static async idBuscado(id){
        const [producto, _info] = await db.query(
            `SELECT ID, Categoria, Nombre_del_producto, Sin_tacc, Premium, Precio, 
            Cantidad_en_stock, Vencimiento, Imagenes 
            from productos_de_havanna where id = ?`, [id] 
        );
        return producto.length ? producto  : null ;

    };

    static async borrarPorId(id){
        const [info] = await db.query(
            `DELETE from productos_de_havanna where id = ?`, [id]
        );
        return info.affectedRows;
    }

    static async productoCreado(producto){
        console.log(producto);
        const{id, Categoria, Nombre_del_producto, Sin_tacc, Premium, Precio, 
            Cantidad_en_stock, Vencimiento ,Imagenes} = producto;
        const result = await db.query(
            `insert into productos_de_havanna(id, Categoria, Nombre_del_producto, Sin_tacc, 
                Premium, Precio, Cantidad_en_stock, Vencimiento, Imagenes) 
                VALUES(?,?,?,?,?,?,?,?,?)`, [id, Categoria, Nombre_del_producto, Sin_tacc, 
                    Premium, Precio, Cantidad_en_stock, Vencimiento, Imagenes]
        );
        return result ?  result : null;
    }
    
    static async productoModificado(id, validacionParcialProducto){
        let queryParcial = "";
        for (const key in validacionParcialProducto){

            queryParcial += `${key} = '${validacionParcialProducto[key]}', `;
        }
        queryParcial = queryParcial.slice(0,-2);
        const [info] = await db.query(`UPDATE productos_de_havanna SET ${queryParcial} WHERE id = ?`, [id])
        
        return info.affectedRows;
    }
};





