import React, { useEffect, useState } from "react";
import SpinnerComponent from "../../components/Spinner";
import { Breadcrumb, Button, Table } from "antd";
import { Card } from "antd";
import { Form } from "antd";
import { Input } from "antd";
import { SaveFilled, SearchOutlined } from "@ant-design/icons";
import { buscarInscritoService, obtenerInscritosService } from "../../api/inscritosService";
import { obtenerCarrerasForm, obtenerProcesosForm } from "../../api/apiInpputs";
import { Select } from "antd";
import { message } from "antd";
import moment from "moment";

const InscritoPage = () => {
  const [loading, setLoading] = useState();
  const [dataTable, setDataTable] = useState();
  const [formInscritos] = Form.useForm();
  const [selectCarreras, setSelectCarreras] = useState();
  const [selectProcesos, setSelectProcesos] = useState();
  const columnsTable = [
    {
      title: "Proceso",
      dataIndex: "NOMBRE_PROCESO",
      key: "NOMBRE_PROCESO",
    },
    {
      title: "DNI",
      dataIndex: "DNI",
      key: "DNI",
    },
    {
      title: "Carrera",
      dataIndex: "NOMBRE_CARRERA",
      key: "NOMBRE_CARRERA",
    },
    {
      title: "Sede",
      dataIndex: "SEDE_EXAM",
      key: "SEDE_EXAM",
    },
    {
      title: "Prepa",
      dataIndex: "PREPARATORIA",
      key: "PREPARATORIA",
      render: (data, column) => {
        console.log(data)
        return data === 1 ? 'Si' : 'No'
      }
    },
    {
      title: "Año term",
      dataIndex: "YEAR_CONCLU",
      key: "YEAR_CONCLU",
    },
    {
      title: "Fecha Reg",
      dataIndex: "FECHA_REGISTRO",
      key: "FECHA_REGISTRO",
      render: (data) => moment(data).format('YYYY/MM/DD')
    },
  ];
  const getDataInputs = async () => {
    const resp_carreras = await obtenerCarrerasForm();
    const resp_procesos = await obtenerProcesosForm()
    setSelectCarreras(resp_carreras.data);
    setSelectProcesos(resp_procesos.data)
  };
  const refreshTable = async () => {
    const resp = await obtenerInscritosService();
    setDataTable(resp.data);
  };
  const buscarInscrito = async() => {
    const params = formInscritos.getFieldValue()
    params.DNI = params.DNI || ''
    params.COD_CARRERA = params.COD_CARRERA || ''
    params.SEDE_EXAM = params.SEDE_EXAM || ''
    const resp = await buscarInscritoService(params)
    if(resp.status === 200) {
      message.success('Datos encontrados')
      setDataTable(resp.data)
      return 
    }
    message.error('Ocurrio un error')
    console.log(resp)
  }
  useEffect(() => {
    refreshTable();
    getDataInputs();
  }, []);
  return (
    <div>
      {loading ? <SpinnerComponent /> : ""}
      <div className="contentDashboard">
        <h1 class="titlePageDashboard">Inscritos</h1>
        <Breadcrumb className="bradcrumpPadding">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Inscritos</Breadcrumb.Item>
        </Breadcrumb>
        <Card type="inner" title="Crear estudiantes">
          <Form layout="vertical" form={formInscritos}>
            <div className="vacantesPageContainerFormCrearVacante">
              <Form.Item label="Proceso" name="PROCESO">
              <Select
                  showSearch
                  placeholder="Selecciona una proceso"
                  options={selectProcesos}
                />
              </Form.Item>
              <Form.Item label="Carrera" name="COD_CARRERA">
                <Select
                  showSearch
                  placeholder="Selecciona una carrera"
                  options={selectCarreras}
                />
              </Form.Item>
              <Form.Item label="DNI" name="DNI">
                <Input maxLength={8} />
              </Form.Item>
              <Form.Item label="Sede" name="SEDE_EXAM">
                <Input maxLength={20} />
              </Form.Item>
            </div>
            <Form.Item className="filaBotones">
              <Button type="primary" icon={<SaveFilled />}>
                Guardar Cambios
              </Button>
              <Button icon={<SearchOutlined />} onClick={buscarInscrito}>
                Buscar
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card type="inner" title="Lista de estudiantes">
          <Table dataSource={dataTable} columns={columnsTable} size="small" />
        </Card>

        {/* <Drawer title="Modificar carrera" placement="right" onClose={hiddenPanelEditCarrera} open={panelEditarCarrera}>
                    <Form layout='vertical' form={formModificarCarreras} onFinish={modificarCarrera}>
                        <Form.Item label="Facultad" name="FACULTAD">
                                <Select
                                    showSearch
                                    placeholder="Selecciona un proceso"
                                    options={selectFacultad}
                                    // onChange={"verificarEstadoProceso"}
                                    rules={[{ required: true, message: 'El estado es requerido' }]}
                                />
                        </Form.Item>
                        <Form.Item label="Carrera" name="ESCUELA">
                            <Input rules={[{ required: true, message: 'El estado es requerido' }]}/>
                        </Form.Item>
                        
                        <Form.Item label="Codigo" name="CODIGO_ESCUELA">
                            <Input rules={[{ required: true, message: 'El estado es requerido' }]}/>
                        </Form.Item>
                        <Form.Item label="Area" name="AREA">
                            <Input rules={[{ required: true, message: 'El estado es requerido' }]}/>
                        </Form.Item>
                        <Form.Item label="Sede" name="SEDE_FACULTAD">
                            <Input rules={[{ required: true, message: 'El estado es requerido' }]}/>
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" block htmlType='submit'>Guardar cambios</Button>
                        </Form.Item>
                        <Form.Item name="ID">
                            <Input type='hidden'/>
                        </Form.Item>
                    </Form>
                </Drawer> */}
      </div>
    </div>
  );
};

export default InscritoPage;
