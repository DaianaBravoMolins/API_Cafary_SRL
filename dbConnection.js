import mysql2 from "mysql2/promise.js";


const dbConfig ={
    host: "localhost",
    user: "root",
    port: 3306,
    database: "cafary_srl",
};

// dbConfig.connect((err) =>{
//     console.log(err ? `Error al conectar ${err}` : "Conectado a la Base de Datos"); 
// });
export const db = await mysql2.createConnection(dbConfig);


// En un proyecto real se puede poner un "pool":
//export const db = mysql2.createPoll(dbconfig);
//no va el await. La db se encargaria de gestionar las peticiones simultaneas y las q estan en cola.  
