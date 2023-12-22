// import connectOracle from '../../../config/connection.oracledb';
// import { EstadosHttp } from '../../../constantes/mensajes/mensajes.constant';
// import { MantenimientoOpcionesRolRepository } from "../../../repository/seguridad/mantenimiento-opciones-rol/MantenimientoOpcionesRol.repository";
// import { logger } from '../../../resources/manager-log.resource';

export class MantenimientoOpcionesRolService {
    // public asignarOpcionesRolRepository: MantenimientoOpcionesRolRepository;

    constructor() {
        // this.asignarOpcionesRolRepository = new MantenimientoOpcionesRolRepository();
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