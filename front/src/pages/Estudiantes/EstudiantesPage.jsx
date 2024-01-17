import React, { useEffect, useState } from 'react';
import SpinnerComponent from '../../components/Spinner';
import { Breadcrumb, Button, DatePicker, Modal, Select, Space, Table } from 'antd';
import { Card } from 'antd';
import { Form } from 'antd';
import { Input } from 'antd';
import { SaveFilled, SearchOutlined } from '@ant-design/icons';
import {
  buscarEstudianteService,
  modificarEstudianteService,
  obtenerEstudiantesService,
  registrarEInscribirEstudianteService,
} from '../../api/estudiantesAdmService';
import { Popconfirm } from 'antd';
import { Drawer } from 'antd';
import { message } from 'antd';
import moment from 'moment';
import { buscarAulaPorTurnoForm, obtenerCarrerasCodigoForm, obtenerCarrerasForm, obtenerDepartamentosForm, obtenerDiscapacidadesForm, obtenerDistritosForm, obtenerProcesoActivoForm, obtenerProcesosForm, obtenerProvinciasForm, obtenerRazasEtnicasForm, obtenerTodosLosProcesosActivosForm } from '../../api/apiInpputs';
import { formatDateUtil, formatOnlyYear } from '../../util/Util';

const EstudiantesPage = () => {
  const [loading, setLoading] = useState();
  const [formEstudiantes] = Form.useForm();
  const [dataTable, setDataTable] = useState();
  const [formModificarEstudiante] = Form.useForm();
  const [panelEditarEstudiante, setPanelEditarEstudiante] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Selects
  const [selectCarreras, setSelectCarreras] = useState([]);
  const [selectAulas, setSelectAulas] = useState([]);
  const [selectProcesos, setSelectProcesos] = useState([]);
  const [selectDiscapacidades, setSelectDiscapacidades] = useState([]);
  const [selectEtnias, setSelectEtnias] = useState([])
  const [selectDepartamento, setSelectDepartamento] = useState([])
  const [selectProvincia, setSelectProvincia] = useState([])
  const [selectDistrito, setSelectDistrito] = useState([])

  const [stateDiscapacidad, setStateDiscapacidad] = useState(false);
  const [stateAulas, setStateAulas] = useState(false)

  const [formRegistrarEInscribir] = Form.useForm()
  
  const columnsTable = [
    {
      title: 'DNI',
      dataIndex: 'DNI',
      key: 'DNI',
    },
    {
      title: 'NOMBRE COMPLETO',
      dataIndex: 'NOMBRE_COMPLETO',
      key: 'NOMBRE_COMPLETO',
    },
    {
      title: 'Celular',
      dataIndex: 'CELULAR',
      key: 'CELULAR',
    },
    {
      title: 'Correo',
      dataIndex: 'CORREO',
      key: 'CORREO',
    },
    {
      title: 'Fecha',
      dataIndex: 'FECHA_REGISTRO',
      key: 'FECHA_REGISTRO',
      render: (data) => moment(data).format('YYYY/MM/DD'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, column) => {
        // if (column.ESTADO === 1) {
        return (
          <Popconfirm
            title="Carerra"
            description="Quieres editar este carrera?"
            onConfirm={() => {
              showPanelEditEstudiante({ ID: column.ID });
            }}
            onCancel={() => ''}
            okText="Si"
            cancelText="No"
          >
            <Button type="link" info>
              Editar
            </Button>
          </Popconfirm>
        );
      },
    },
  ];
  const changeDepartamento = async (e) => {
    setLoading(true)
    const respSelectProvincia = await obtenerProvinciasForm({DEPARTAMENTO: e})
    setSelectProvincia(respSelectProvincia.data)
    setLoading(false)
  }
  const changeProvincia = async(e) => {
    setLoading(true)
    const respSelectDistrito = await obtenerDistritosForm({PROVINCIA: e})
    setSelectDistrito(respSelectDistrito.data)
    setLoading(false)
  }
  const getSelectsRegistrarEstudiante = async() => {
    const respSelectCarreras = await obtenerCarrerasCodigoForm()
    const respSelectProcesos = await obtenerTodosLosProcesosActivosForm()
    const respSelectDiscapacidades = await obtenerDiscapacidadesForm()
    const respSelectEtnias = await obtenerRazasEtnicasForm()
    const respSelectDepartamentos = await obtenerDepartamentosForm()
    
    
    
    setSelectCarreras(respSelectCarreras.data)
    
    setSelectProcesos(respSelectProcesos.data)
    setSelectDiscapacidades(respSelectDiscapacidades.data)
    setSelectEtnias(respSelectEtnias.data)
    setSelectDepartamento(respSelectDepartamentos.data)

  }
  
  const showPanelEditEstudiante = async (params) => {
    const data = dataTable.find((carrera) => carrera.ID === params.ID);
    formModificarEstudiante.setFieldsValue(data);
    setPanelEditarEstudiante(true);
  };
  const initialValues = {
    DNI: '',
    CORREO: '',
    CELULAR: '',
  };
  const hiddenPanelEditEstudiante = () => {
    setPanelEditarEstudiante(false);
  };
  const modificarEstudiante = async (params) => {
    const resp = await modificarEstudianteService(params);
    if (resp.data.ok) {
      message.success(resp.data.message);
      await refreshTable();
      hiddenPanelEditEstudiante();
      return;
    }
    message.error(resp.data.message);
  };
  const handleCancel = () => { setIsModalOpen(false)}
  const handleOk = () => {}
  const handleProcesos = (value) => {
    selectProcesos.forEach(proceso => {
      if(proceso.value === value) {
        proceso.TIPO_PROCESO === 'C' ? setStateAulas(true): setStateAulas(false)
      }
    });
  }


  const showModal = async () => {
    setLoading(true)
    await getSelectsRegistrarEstudiante()
    setIsModalOpen(true)
    setLoading(false)
  }
  const refreshTable = async () => {
    const resp = await obtenerEstudiantesService();
    setDataTable(resp.data);
  };
  const handleDiscapacidad = async(e) => {
    e === 1 ? setStateDiscapacidad(true): setStateDiscapacidad(false)
  }
  const buscarEstudiante = async () => {
    const params = formEstudiantes.getFieldValue();
    params.DNI = params.DNI || '';
    params.CORREO = params.CORREO || '';
    params.CELULAR = params.CELULAR || '';
    if (params.DNI === '' && params.CORREO === '' && params.CELULAR === '') {
      refreshTable();
      return;
    }

    const resp = await buscarEstudianteService(params);
    setDataTable(resp.data);
  };
  const registrarEInscribirEstudiante = async (params) => {
    params.FECHA_NACIMIENTO = formatDateUtil(params.FECHA_NACIMIENTO)
    params.YEAR_CONCLU = formatOnlyYear(params.YEAR_CONCLU)
    const resp = await registrarEInscribirEstudianteService(params)
    if(resp.data.ok) {
      message.success(resp.data.message)
      // await refreshTable()
      // return
    }
  }
  const changeTurno = async(params) => {
    const resp = await buscarAulaPorTurnoForm({TURNO: params})
    setSelectAulas(resp.data)
  }
  useEffect(() => {
    setLoading(true)
    refreshTable();
    setLoading(false)
  }, []);

  return (
    <>
    <div>
      {loading ? <SpinnerComponent /> : ''}
      <div className="contentDashboard">
        <h1 className="titlePageDashboard">Estudiantes</h1>
        <Breadcrumb className="bradcrumpPadding">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Estudiantes</Breadcrumb.Item>
        </Breadcrumb>
        <Card
          type="inner"
          title="Crear estudiantes"
          initialValues={initialValues}
        >
          <Form layout="vertical" form={formEstudiantes}>
            <div className="vacantesPageContainerFormCrearVacante">
              <Form.Item label="DNI" name="DNI">
                <Input />
              </Form.Item>
              <Form.Item label="Correo" name="CORREO">
                <Input />
              </Form.Item>
              <Form.Item label="Celular" name="CELULAR">
                <Input />
              </Form.Item>
            </div>
            <Form.Item className="filaBotones">
              <Button type="primary" icon={<SaveFilled />}>
                Guardar Cambios
              </Button>

              <Button icon={<SearchOutlined />} onClick={buscarEstudiante}>
                Buscar
              </Button>
              <Button type="primary" onClick={showModal}>Registrar Estudiante</Button>
            </Form.Item>
          </Form>
        </Card>
        <Card type="inner" title="Lista de estudiantes">
          <Table dataSource={dataTable} columns={columnsTable} size="small" />
        </Card>

        <Drawer
          title="Modificar estudiante"
          placement="right"
          onClose={hiddenPanelEditEstudiante}
          open={panelEditarEstudiante}
        >
          <Form
            layout="vertical"
            form={formModificarEstudiante}
            onFinish={modificarEstudiante}
          >
            <Form.Item label="DNI" name="DNI">
              <Input />
            </Form.Item>
            <Form.Item label="Apellido Paterno" name="AP_PATERNO">
              <Input />
            </Form.Item>
            <Form.Item label="Apellido Materno" name="AP_MATERNO">
              <Input />
            </Form.Item>
            <Form.Item label="Nombres" name="NOMBRES">
              <Input />
            </Form.Item>
            <Form.Item label="Celular" name="CELULAR">
              <Input />
            </Form.Item>
            <Form.Item label="Correo" name="CORREO">
              <Input />
            </Form.Item>
            <Button htmlType="submit">Guardar cambios</Button>
            <Form.Item name="ID">
              <Input type="hidden" />
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </div>

    <Drawer
        title={'Inscribir estudiante'}
        placement="right"
        size={'large'}
        onClose={handleCancel}
        open={isModalOpen}
        extra={
          <Space>
            <Button type="primary" onClick={formRegistrarEInscribir.submit}>
              Guardar
            </Button>
          </Space>
        }
      >
        <Form layout='vertical' className='formProcesosDashAdmin' form={formRegistrarEInscribir} onFinish={registrarEInscribirEstudiante}>
          {/*                              */}
          <Form.Item label="Proceso" name="PROCESO" rules={[{ required: true }]}>
            <Select
              options={selectProcesos}
              onChange={handleProcesos}
            />
          </Form.Item>
          <Form.Item label="DNI" name="DNI" rules={[{ required: true }]}>
            <Input maxLength={8} />
          </Form.Item>
          <Form.Item label="Apellido paterno" name="AP_PATERNO" rules={[{ required: true }]}>
            <Input maxLength={20} />
          </Form.Item>
          <Form.Item label="Apellido materno" name="AP_MATERNO" rules={[{ required: true }]}>
            <Input maxLength={20} />
          </Form.Item>
          <Form.Item label="Nombre" name="NOMBRES" rules={[{ required: true }]}>
            <Input maxLength={50} />
          </Form.Item>
          <Form.Item label="Celular" name="CELULAR_EST" rules={[{ required: true }]}>
            <Input maxLength={9} />
          </Form.Item>
          <Form.Item label="Correo" name="CORREO" rules={[{ required: true, type:"email" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Sexo" name="SEXO" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="M">MASCULINO</Select.Option>
              <Select.Option value="F">FEMENINO</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Fecha de Nacimiento" name="FECHA_NACIMIENTO" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Departamento" name="DEPARTAMENTO" rules={[{ required: true }]}>
            <Select
              options={selectDepartamento}
              onChange={changeDepartamento}
            />
          </Form.Item>
          <Form.Item label="Provincia" name="PROVINCIA" rules={[{ required: true }]}>
            <Select
              options={selectProvincia}
              onChange={changeProvincia}
            />
          </Form.Item>
          <Form.Item label="Distrito" name="DISTRITO" rules={[{ required: true }]}>
            <Select
              options={selectDistrito}
            />
          </Form.Item>
          <Form.Item label="Direccion" name="DIRECCION" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Tiene Discapacidad?" name="DISCAPACIDAD" rules={[{ required: true }]}>
            <Select
              options={[
                { label: 'Si', value: 1},
                { label: 'No', value: 0}
              ]}
              onChange={handleDiscapacidad}
            />
          </Form.Item>
          {
            stateDiscapacidad ?
              <Form.Item label="Cual?" name="TIPO_DISCAPACIDAD" rules={[{ required: true }]}>
                <Select
                  options={selectDiscapacidades}
                />
              </Form.Item>
            : ''
          }
          <Form.Item label="Raza etnica" name="ETNICA" rules={[{ required: true }]}>
            <Select
              options={selectEtnias}
            /> 
          </Form.Item>
          <Form.Item label="TELEFONO" name="TELEFONO" rules={[{ required: true }]}>
            <Input maxLength={9} />
          </Form.Item>
          <Form.Item label="Tipo de colegio" name="TIPO_COLEGIO" rules={[{ required: true }]}>
            <Select
              options={[
                {label: 'ESTATAL', value: 'E'},
                {label: 'PRIVADA', value: 'P'}
              ]}
            />
          </Form.Item>
          <Form.Item label="Nombre del colegio" name="NOMBRE_COLEGIO" rules={[{ required: true }]}>
            <Input maxLength={40} />
          </Form.Item>
          <Form.Item label="Nombres apoderado" name="NOMBRE_COMPLETO_APO" rules={[{ required: true }]}>
            <Input maxLength={40} />
          </Form.Item>
          <Form.Item label="Celular apoderado" name="CELULAR_APO" rules={[{ required: true }]}>
            <Input maxLength={9} />
          </Form.Item>
          <Form.Item label="DNI Apoderado" name="DNI_APO" rules={[{ required: true }]}>
            <Input maxLength={8} />
          </Form.Item>
          <Form.Item label="Carrera" name="COD_CARRERA" rules={[{ required: true }]}>
            <Select
              options={selectCarreras}
            />
          </Form.Item>
          <Form.Item label="Sede de examen" name="SEDE_EXAM" rules={[{ required: true }]}>
            <Select
              options={[
                {label: 'Pasco', value:'Pasco'},
                {label: 'Oxapampa', value:'Oxapampa'},
                {label: 'Tarma', value:'Tarma'}
              ]}
            />
          </Form.Item>
          <Form.Item label="Preparatoria?" name="PREPARATORIA" rules={[{ required: true }]}>
            <Select
              options={[
                {label: 'Si', value: 1},
                {label: 'No', value: 0}
              ]}
            />
          </Form.Item>
          {
            stateAulas
            ?
              <>
              <Form.Item label="Turno" name="TURNO" rules={[{ required: true }]}>
                <Select
                  options={[
                    {label: 'MAÑANA', value: 'M'},
                    {label: 'TARDE', value: 'T'},
                  ]}
                  onChange={changeTurno}
                />
              </Form.Item>
              <Form.Item label="Aula" name="ID_AULA" rules={[{ required: true }]}>
                <Select
                  options={selectAulas}
                />
              </Form.Item>
              </>
            :
            ''
          }
          <Form.Item label="Año secundario termino?" name="YEAR_CONCLU" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} picker="year" />
          </Form.Item>
          <Form.Item ></Form.Item>
          {/* <Button type="primary" htmlType='submit'>Comprobar</Button> */}
        </Form>
      </Drawer>
    
</>
  );
};

export default EstudiantesPage;
