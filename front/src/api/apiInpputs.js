import axios from './axiosConfig';

const obtenerProcesosForm = async () => {
  try {
    const response = await axios.get(
      'http://localhost:3500/input-controls/obtener-procesos',
    );
    return response;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
const obtenerCarrerasForm = async () => {
  try {
    const response = await axios.get(
      'http://localhost:3500/input-controls/obtener-carreras',
    );
    return response;
  } catch (error) {
    console.error('Error', error);
  }
};
const obtenerCarrerasCodigoForm = async () => {
  try {
    const response = await axios.get(
      'http://localhost:3500/input-controls/obtener-carreras-codigo',
    );
    return response;
  } catch (error) {
    console.error('Error', error);
  }
};
const obtenerFacultadesForm = async () => {
  try {
    const resp = await axios.get(
      'http://localhost:3500/input-controls/obtener-facultades',
    );
    return resp;
  } catch (error) {
    console.error('Error', error);
  }
};
const obtenerProcesoActivoForm = async () => {
  try {
    const resp = await axios.get(
      'http://localhost:3500/input-controls/obtener-proceso-activo',
    );
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
const obtenerDiscapacidadesForm = async () => {
  try {
    const resp = await axios.get(
      'http://localhost:3500/input-controls/obtener-discapacidades',
    );
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
const obtenerRazasEtnicasForm = async () => {
  try {
    const resp = await axios.get(
      'http://localhost:3500/input-controls/obtener-razas-etnicas',
      {headers: { Authorization: `Bearer ${localStorage.getItem('token-estudiante')}` },}
    );
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
const obtenerUbicacionesForm = async () => {
  try {
    const resp = await axios.get(
      'http://localhost:3500/input-controls/obtener-ubicaciones',
    );
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
const obtenerDepartamentosForm = async () => {
  try {
    const resp = await axios.get(
      'http://localhost:3500/input-controls/obtener-departamentos',
    );
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
const obtenerProvinciasForm = async (params) => {
  try {
    const resp = await axios.get(
      'http://localhost:3500/input-controls/obtener-provincias',
      { 
        params: { ...params }
      },
    );
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};
const obtenerDistritosForm = async (params) => {
  try {
    const resp = await axios.get(
      'http://localhost:3500/input-controls/obtener-distritos',
      { params: { ...params } },
    );
    return resp;
  } catch (error) {
    console.error('Ocurrio un error', error);
  }
};

export {
  obtenerCarrerasForm,
  obtenerProcesosForm,
  obtenerFacultadesForm,
  obtenerCarrerasCodigoForm,
  obtenerProcesoActivoForm,
  obtenerDiscapacidadesForm,
  obtenerRazasEtnicasForm,
  obtenerUbicacionesForm,
  obtenerDepartamentosForm,
  obtenerProvinciasForm,
  obtenerDistritosForm,
};
