import connectMysql from "../../../config/connection.mysqldb";
import { EstudianteInterface } from "../../../interfaces/administrador/estudiantes.interface";
import bcrypt from "bcrypt";
import { EstudianteGeneralRepository } from "../../../repository/general/estudiante/estudianteGeneral.repo";

export class EstudiantesGeneralService {
  public estudianteRepo: EstudianteGeneralRepository;
  public constructor() {
    this.estudianteRepo = new EstudianteGeneralRepository();
  }

  public consultarEstudianteExiste = async (params: EstudianteInterface) => {
    const dbConnect: any = await connectMysql.connectMysql();
    try {
      const result = await this.estudianteRepo.consultarEstudianteExiste(
        dbConnect,
        params
      );
      return result;
    } catch (error) {
      await dbConnect.rollback();
    } finally {
      await dbConnect.close();
    }
  };

  public registrarEstudiante = async (params: EstudianteInterface) => {
    const dbConex: any = await connectMysql.connectMysql();
    try {
      params.FECHA_REGISTRO = new Date();
      const password: any = params.PASSWORD;
      const salt = await bcrypt.genSalt(10);
      const password_encript = await bcrypt.hash(password, salt);
      params.PASSWORD = password_encript;
      const [result] = await this.estudianteRepo.registrarEstudiante(
        dbConex,
        params
      );
      if (result.affectedRows > 0)
        return { ok: true, message: "Se modifico correctamente" };
      return { ok: false, message: "Ocurrio un error al registrar" };
    } catch (error) {
      await dbConex.rollback();
    } finally {
      await dbConex.close();
    }
  };

  public registrarDatosComplementarios = async (params: any) => {
    const dbConex: any = await connectMysql.connectMysql();
    try {
      const data = {
        DNI: params.DNI,
        SEXO: params.SEXO,
        FECHA_NACIMIENTO: params.FECHA_NACIMIENTO,
        LUGAR_NACIMIENTO: params.LUGAR_NACIMIENTO,
        DIRECCION: params.DIRECCION,
        DISCAPACIDAD: params.DISCAPACIDAD,
        TIPO_DISCAPACIDAD: params.TIPO_DISCAPACIDAD,
        ETNICA: params.ETNICA,
        CELULAR: params.CELULAR,
        TELEFONO: params.TELEFONO,
        RUTA_FOTO: params.RUTA_FOTO,
        NOMBRE_COLEGIO: params.NOMBRE_COLEGIO,
        TIPO_COLEGIO: params.TIPO_COLEGIO,
        NOMBRE_COMPLETO_APO: params.NOMBRE_COMPLETO_APO,
        CELULAR_APO: params.CELULAR_APO,
        DNI_APO: params.DNI_APO,
        FECHA_REGISTRO: new Date()
      };

      const [result] =
        await this.estudianteRepo.registrarDatosComplementariosEstudiante(
          dbConex,
          data
        );
      if (result.affectedRows > 0)
        return { ok: true, message: "Se modifico correctamente" };
      return { ok: false, message: "Ocurrio un error al registrar" };
    } catch (error) {
      await dbConex.rollback();
    } finally {
      await dbConex.close();
    }
  };
  public registrarInscripcionEstudiante = async (params: any) => {
    const dbConex: any = await connectMysql.connectMysql();
    try {
      const data = {
        DNI: params.DNI,
        COD_CARRERA: params.COD_CARRERA,
        PROCESO: params.PROCESO,
        MODALIDAD: params.PROCESO,
        SEDE_EXAM: params.SEDE_EXAM,
        PAGO_1: params.PAGO_1 || 0,
        PAGO_2: params.PAGO_2 || 0,
        PREPARATORIA: 0,
        YEAR_CONCLU: params.YEAR_CONCLU,
        FECHA_REGISTRO: new Date(),
      };
      const [result]: any = await this.estudianteRepo.registrarInscripcionEstudiante(dbConex, data);

      if (result.affectedRows > 0) {return { ok: true, message: "Se modifico correctamente" };}
      return { ok: false, message: "Ocurrio un error al registrar" };
    } catch (error) {
      await dbConex.rollback();
    } finally {
      await dbConex.close();
    }
  };
}
