// import connectOracle from '../../../config/connection.oracledb';
import connectMysql from '../../../config/connection.mysqldb'
import { ProcesosRepository } from '../../../repository/administrador/procesos/procesos.repository'
// import { EstadosHttp } from '../../../constantes/mensajes/mensajes.constant';
// import { MantenimientoOpcionesRolRepository } from "../../../repository/seguridad/mantenimiento-opciones-rol/MantenimientoOpcionesRol.repository";
// import { logger } from '../../../resources/manager-log.resource';

export class ProcesosService {
    // public asignarOpcionesRolRepository: MantenimientoOpcionesRolRepository;
    public procesosRepo: ProcesosRepository
    constructor() {
        this.procesosRepo = new ProcesosRepository()
        // this.asignarOpcionesRolRepository = new MantenimientoOpcionesRolRepository();
    }
    public obtenerProcesos = async(params: any) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.procesosRepo.obtenerProcesos(dbConnect, params)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public obtenerRolesByParam = async (param: any) => {
        // let connection: any = await connectOracle.conectarOracle()
        // try {
        //     param.descripcion = param.descripcion;
        //     console.log("PARAMTROS RECIBIDOS => ", param)
        //     // const result = await this.asignarOpcionesRolRepository.obtenerRolesByParam(connection, param)
        //     // return result;
        // } catch (error) {
        //     // logger.error("obtenerRolesByParam Serv => ", error)
        //     await connection.rollback();
        //     throw error;
        // } finally {
        //     await connection.close();
        // }
    }
}