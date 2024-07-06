import {validacionParcialContacto}  from "../Validators/productoSchema.js";
import { db } from "../dbConnection.js";

export class contactoModel{
    static async Contactos(){
        const [Contactos, _info] = await db.query(
            `SELECT Id, Mail, Mensaje, Categoria 
            from contacto`
        );
        return Contactos.length ? Contactos : null ;
    }

    static async contactoCreado(contacto){
        console.log(contacto);
        const{Mail, Mensaje, Categoria} = contacto;
        const result = await db.query(
            `insert into contacto(Mail, Mensaje, Categoria) 
                VALUES(?,?,?)`, [Mail, Mensaje, Categoria]
        );
        return result ?  result : null;
    }
    
    static async contactoModificado(Mail, validacionParcialContacto){
        let queryParcial = "";
        for (const key in validacionParcialContacto){
            console.log(key)
            console.log(validacionParcialContacto[key])
            queryParcial += `${key}='${validacionParcialContacto[key]}', `;
        }
        console.log(queryParcial)
        queryParcial = queryParcial.slice(0,-2);
        const [info] = await db.query(`UPDATE contacto SET ${queryParcial} WHERE Mail = ?`, [Mail])
        return info.affectedRows;
    }

        static async borrarContacto(Mail){
        console.log(Mail);
        const [info] = await db.query(
            `DELETE from contacto where Mail = ?`, [Mail]
        );
        return info.affectedRows;
    }
    static async buscarPersona(Mail){
        const [contacto, _info] = await db.query(
            `SELECT Mail, Mensaje, Categoria
            from contacto where Mail = ?`, [Mail] 
        );
        return contacto.length ? contacto : null ;

    };
};
