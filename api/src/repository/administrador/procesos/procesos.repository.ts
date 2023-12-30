import { ProcesosInterface } from '../../../interfaces/administrador/procesos.interface';
import { logger } from '../../../resources/manager-log.resource';
import { generarConsulta } from '../../../util/util'

export class ProcesosRepository {
    public obtenerProcesos = async(connection: any, params: ProcesosInterface) => {
        try {
            const query = `SELECT * FROM procesos ORDER BY ID DESC`;
            const [rows, fields]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error("ProcesosRepo.obtenerProcesos =>", (error))
            throw error
        }
    }
    public crearProceso = async(connection: any, params: ProcesosInterface) => {
        try {
            const query =  await generarConsulta('procesos', params, null)
            const data = Object.values(params)
            const result = await connection.promise().execute(query, data)
            console.log(query)
            return result            
        }catch(error) {
            logger.error('ProcesosRepo.crearProceso => ', error)
            throw error
        }
    }
    public verificarSiHayProcesoAbierto = async(connection: any, params: any) => {
        try {
            const query = `SELECT ID, NOMBRE FROM procesos WHERE ESTADO = 1`
            const [rows, fields] = await connection.promise().query(query)
            return rows
        }catch(error){
            logger.error('ProcesosRepo.verificarSiHayProcesoAbierto => ', error)
        }
    }
    public cerrarProceso = async(connection: any, params: ProcesosInterface) => {
        try {
            const query = await generarConsulta('procesos', params, `ID = ${params.ID}`)
            const data = Object.values(params)
            console.log("generado", query, data)
            const result = await connection.promise().execute(query, data)
            return result
        }catch(error) {
            logger.error(`ProcesosRepo.cerrarProceso =>`, error)
            throw error
        }
    }
}

// export class MantenimientoOpcionesRepository {

//     public obtenerOpcionByParam = async(connection: any, params: any) => {
//         let query: string;
//         const bind: any = {};

//         try {
//             const bind: any = {}
//             query = `
//                            SELECT * 
//                              FROM ds_tab_seg_opciones 
//                             WHERE 1=1 `;

//             if (params.idOpcn){
//                 query += ` AND id_opcn = :id_opcn `;
//                 bind.id_opcn = params.idOpcn;
//             }

//             if (params.descripcion){
//                 query += ` AND UPPER(de_opcn) LIKE UPPER(:de_opcn) `;
//                 bind.de_opcn = `%${params.descripcion}%`;
//             }

//             console.log("QUERY =>", query, bind)
//             const result: any = await connection.execute(query, bind)
//             return result.rows as any 
//         }catch(error) {
//             logger.error("obtenerOpcionByParam Repo => ", String(error.message), error)
//             throw error;
//         }
//     }

//     public sequenceOpciones =async (connection: any) => {
//         try {
//             const query = `SELECT ds_seq_seg_opciones.NEXTVAL AS ID_OPCN FROM DUAL`;      
//             const result: any = await connection.execute(query)
//             return result.rows[0] as any
//         }catch(error) {
//             logger.error("sequenceOpciones =>", String(error))
//             throw error
//         }
//     }
    
//     public registrarOpciones = async(connection: any, params: any) => {
//         // try {
//         //     // const query = await obtenerQuery('INSERT', 'ds_tab_seg_opciones', params, null);
//         //     console.log("🚀 ~ file:  registrarOpciones=async ~ query", query)
//         //     const result = await connection.execute(query, params);
//         //     await connection.commit();
//         //     return result;
//         // }catch(err){
//         //     logger.error(err);
//         //     throw err
//         // }
//     }

//     public actualizarOpciones = async(connection: any, params: any) => {
//         try {
//             const camposWhere = [{ ID: 'ID_OPCN' }]
//             const query = await obtenerQuery('UPDATE', 'ds_tab_seg_opciones', params, camposWhere)
//             console.log("🚀 ~ file:  actualizarOpciones=async ~ query", query, params)
            
//             const result = await connection.execute(query, params)
//             return result
//         }catch(err){
//             logger.error(err);
//             throw err
//         }
//     }

//     public obtenerListadoOpciones = async (connection: any) => {
//         try{
//             const query = `SELECT * FROM ds_tab_seg_opciones ORDER BY id_opcn ASC`
//             const result: any = await connection.execute(query);
//             return result.rows as any[];
//         } catch (err) {
//             logger.error(err);
//             throw err;
//         }
//     };    

//     public obtenerOpcionesPadre = async (connection: any) => {
//         try {
//             const query = "SELECT * FROM ds_tab_seg_opciones"
//             const result: any = await connection.execute(query);
//             return result.rows as any[];
//         }catch (error) {
//             logger.error(error);
//             throw error
//         }
//     }

//     public eliminarOpcion = async(connection: any, params:any) => {
//         try {
//             const bind:any ={};
//             const {id_opcn}=params;
//             const query = `DELETE FROM ds ds_tab_seg_opciones
//                         WHERE ID_OPCN = :ID_OPCN`;
//             bind.ID_OPCN= id_opcn;

//             console.log("CONSULTA =>" ,query, bind)
//             const result = await connection.execute(query, bind)
//             await connection.commit();
//             return result
//         }catch(err){
//             console.error("error => eliminar Opcion", err)
//             connection.rollback();
//             logger.error('eliminaropcion->',String(err));
//             throw new Error;
//         }
//     }
// }