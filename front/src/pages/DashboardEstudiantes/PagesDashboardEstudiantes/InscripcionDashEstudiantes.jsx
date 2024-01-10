import React, { useEffect, useState } from "react";
import { SaveFilled, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  message,
  DatePicker,
  Radio,
} from "antd";
import {
  subirFotoEstudiante,
  inscribirEstudianteService,
} from "../../../api/inscripcionDashEstudianteService";
import {
  obtenerCarrerasCodigoForm,
  obtenerCarrerasForm,
  obtenerDepartamentosForm,
  obtenerDiscapacidadesForm,
  obtenerDistritosForm,
  obtenerProcesoActivoForm,
  obtenerProvinciasForm,
  obtenerRazasEtnicasForm,
} from "../../../api/apiInpputs";
import moment from "moment";

const InscripcionDashboardEstudiante = () => {
  const [formDatosComplementariosEstudiante] = Form.useForm();
  const [selectProcesos, setSelectProcesos] = useState();
  const [selectCarreras, setSelectCarreras] = useState();
  const [selectDiscapacidades, setSelectDiscapacidades] = useState();
  const [selectRazasEtnicas, setSelectRazasEtnicas] = useState();

  const [optionsDepartamento, setOptionsDepartamento] = useState();
  const [optionsProvincia, setOptionsProvincia] = useState();
  const [optionsDistrito, setOptionsDistrito] = useState();
  const [fileList, setFileList] = useState([]);

  const subirFoto = async () => {
    const formData = new FormData();
    formData.append("foto", fileList[0]);

    const resp_foto = await subirFotoEstudiante(formData);
    console.log(resp_foto);
  };

  const getInputs = async () => {
    const resp_proceso_activo = await obtenerProcesoActivoForm();
    const resp_carreras = await obtenerCarrerasCodigoForm();
    const resp_discapacidades = await obtenerDiscapacidadesForm();
    const resp_razas_etnicas = await obtenerRazasEtnicasForm();
    const resp_departamentos = await obtenerDepartamentosForm();

    // const resp_ubicaciones = await obtenerUbicacionesForm();

    // setOptionsUbicacion(resp_ubicaciones.data);
    setOptionsDepartamento(resp_departamentos.data);
    setSelectProcesos(resp_proceso_activo.data);
    setSelectCarreras(resp_carreras.data);
    setSelectDiscapacidades(resp_discapacidades.data);
    setSelectRazasEtnicas(resp_razas_etnicas.data);
  };
  const guardarDatosComplementarios = async (params) => {
    params.DNI = "72353567";
    params.RUTA_FOTO = params.DNI + ".jpg";
    params.LUGAR_NACIMIENTO = "010101";
    params.CELULAR = "999999999";
    params.FECHA_NACIMIENTO = moment(params.FECHA_NACIMIENTO).format(
      "YYYY-MM-DD"
    );
    params.YEAR_CONCLU = moment(params.YEAR_CONCLU).format("YYYY");
    console.log("DATOS", params);
    const resp = await inscribirEstudianteService(params);
    console.log(resp);
    // await subirFoto();
    // setFormDatosComplementariosDisabled(true);
  };
  const buscarDistrito = async (params) => {
    const resp = await obtenerDistritosForm({ PROVINCIA: params });
    setOptionsDistrito(resp.data);
  };

  const buscarProvincia = async (params) => {
    const resp = await obtenerProvinciasForm({ DEPARTAMENTO: params });
    setOptionsProvincia(resp.data);
  };

  useEffect(() => {
    getInputs();
  }, []);
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  return (
    <>
      <h1>Datos</h1>
      <Form
        layout="vertical"
        form={formDatosComplementariosEstudiante}
        onFinish={guardarDatosComplementarios}
      >
        <div className="gridInscripcionEstudianteDashboard">
          <div className="cardDashEstudiante">
            <div className="cardDashEstudianteHeader">
              <p>Apoderado</p>
            </div>

            <div className="cardDashEstudianteBody">
              <div className="gridFormFormularioApoderado">
                <Form.Item
                  className="FormItem"
                  label="Apellido y nombres"
                  name="NOMBRE_COMPLETO_APO"
                  rules={[{ required: false }]}
                >
                  <Input maxLength={30} />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Numero de celular "
                  name="CELULAR_APO"
                  rules={[{ required: false }]}
                >
                  <Input maxLength={9} />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Numero de DNI"
                  name="DNI_APO"
                  rules={[{ required: false }]}
                >
                  <Input maxLength={8} />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="cardDashEstudiante">
            <div className="cardDashEstudianteHeader">
              <p>Formulario de inscripcion</p>
            </div>
            <div className="cardDashEstudianteBody">
              <div className="gridFormFormularioInscripcion">
                <Form.Item
                  className="FormItem"
                  label="Modalidad"
                  name="PROCESO"
                  rules={[{ required: false }]}
                >
                  <Select
                    showSearch
                    placeholder="Selecciona un proceso"
                    options={selectProcesos}
                  />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Programa de Estudio"
                  name="COD_CARRERA"
                  rules={[{ required: false }]}
                >
                  <Select
                    showSearch
                    placeholder="Selecciona un proceso"
                    options={selectCarreras}
                  />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Año termino secundaria"
                  name="YEAR_CONCLU"
                  rules={[{ required: false }]}
                >
                  <DatePicker picker="year" />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Tipo de Colegio"
                  name="TIPO_COLEGIO"
                  rules={[{ required: false }]}
                >
                  <Radio.Group defaultValue="a" buttonStyle="solid">
                    <Radio.Button value="E">Estatal</Radio.Button>
                    <Radio.Button value="P">Privada</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Nombre de Colegio"
                  name="NOMBRE_COLEGIO"
                  rules={[{ required: false }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Sede de Examen"
                  name="SEDE_EXAM"
                  rules={[{ required: false }]}
                >
                  <Select
                    options={[
                      {
                        value: "Pasco",
                        label: "Pasco",
                      },
                      {
                        value: "Tarma",
                        label: "Tarma",
                      },
                      {
                        value: "Oxampampa",
                        label: "Oxampampa",
                      },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="cardDashEstudiante">
            <div className="cardDashEstudianteHeader">
              <p>Datos Complementarios</p>
            </div>
            <div className="cardDashEstudianteBody">
              <div className="gridFormDatosComplementarios">
                <Form.Item
                  className="FormItem"
                  label="Genero"
                  name="SEXO"
                  rules={[{ required: false }]}
                >
                  <Select
                    options={[
                      {
                        value: "M",
                        label: "Masculino",
                      },
                      {
                        value: "F",
                        label: "Femenino",
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Fecha de Nacimiento"
                  name="FECHA_NACIMIENTO"
                  rules={[{ required: false }]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Departamento"
                  name="DEPARTAMENTO"
                  rules={[{ required: false }]}
                >
                  <Select
                    options={optionsDepartamento}
                    onChange={buscarProvincia}
                  />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="PROVINCIA"
                  name="PROVINCIA"
                  rules={[{ required: false }]}
                >
                  <Select
                    onChange={buscarDistrito}
                    options={optionsProvincia}
                  />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="DISTRITO"
                  name="DISTRITO"
                  rules={[{ required: false }]}
                >
                  <Select options={optionsDistrito} />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Direccion Actual"
                  name="DIRECCION"
                  rules={[{ required: false }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="¿Tiene discapacidad?"
                  name="TIPO_DISCAPACIDAD"
                  rules={[{ required: false }]}
                >
                  <Select
                    showSearch
                    placeholder="Si o No"
                    options={[
                      {
                        label: "Si",
                        value: 1,
                      },
                      {
                        label: "No",
                        value: 0,
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Tipo de Discapacidad"
                  name="DISCAPACIDAD"
                  rules={[{ required: false }]}
                >
                  <Select
                    showSearch
                    placeholder="Selecciona un proceso"
                    options={selectDiscapacidades}
                  />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Identidad Etnica"
                  name="ETNICA"
                  rules={[{ required: false }]}
                >
                  <Select
                    showSearch
                    placeholder="Selecciona un proceso"
                    options={selectRazasEtnicas}
                  />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Telefono Fijo"
                  name="TELEFONO"
                  rules={[{ required: false }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item className="FormItem" label="Foto" name="RUTA_FOTO">
                  <Upload {...props} maxCount={1}>
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>
              </div>
              <Button
                type="primary"
                block
                icon={<SaveFilled />}
                htmlType="submit"
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default InscripcionDashboardEstudiante;
