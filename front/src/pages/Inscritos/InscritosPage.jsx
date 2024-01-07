import React, { useEffect, useState } from "react";
import SpinnerComponent from "../../components/Spinner";
import { Breadcrumb, Button, Table } from "antd";
import { Card } from "antd";
import { Form } from "antd";
import { Input } from "antd";
import { SaveFilled, SearchOutlined } from "@ant-design/icons";
import {
  buscarInscritoService,
  modificarInscritoService,
  obtenerInscritosService,
} from "../../api/inscritosService";
import { obtenerCarrerasCodigoForm, obtenerCarrerasForm, obtenerProcesosForm } from "../../api/apiInpputs";
import { Select } from "antd";
import { message } from "antd";
import moment from "moment";
import { Popconfirm } from "antd";
import { Drawer } from "antd";

const InscritoPage = () => {
  const [loading, setLoading] = useState();
  const [dataTable, setDataTable] = useState();
  const [formInscritos] = Form.useForm();
  const [selectCarreras, setSelectCarreras] = useState();
  const [selectCarrerasCodigo, setSelectCarrerasCodigo] = useState();
  const [selectProcesos, setSelectProcesos] = useState();
  const [panelEditarInscritos, setPanelEditarInscritos] = useState(false);
  const [formModificarInscritos] = Form.useForm();
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
        console.log(data);
        return data === 1 ? "Si" : "No";
      },
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
      render: (data) => moment(data).format("YYYY/MM/DD"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, column) => {
        return (
          <Popconfirm
            title="Carerra"
            description="Quieres editar este carrera?"
            onConfirm={() => showPanelEditInscritos({ ID: column.ID })}
            onCancel={() => ""}
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
  const hiddenPanelEditInscritos = () => setPanelEditarInscritos(false);
  const showPanelEditInscritos = (params) => {
    const data = dataTable.find((inscrito) => inscrito.ID === params.ID);
    console.log(params);
    console.log(data);
    formModificarInscritos.setFieldsValue(data);
    setPanelEditarInscritos(true)
  };
  const getDataInputs = async () => {
    const resp_carreras = await obtenerCarrerasForm();
    const resp_procesos = await obtenerProcesosForm();
    const resp_carreras_codigo = await obtenerCarrerasCodigoForm()
    setSelectCarreras(resp_carreras.data);
    setSelectCarrerasCodigo(resp_carreras_codigo.data);
    setSelectProcesos(resp_procesos.data);
  };
  const refreshTable = async () => {
    const resp = await obtenerInscritosService();
    setDataTable(resp.data);
  };
  const modificarInscrito = async (params) => {
    const resp = await modificarInscritoService(params)
    console.log(params, resp)
    if(resp.data.ok) {
      message.success(resp.data.message)
      refreshTable()
      hiddenPanelEditInscritos()
      return
    }
    message.error(resp.data.message)
  };
  const buscarInscrito = async () => {
    const params = formInscritos.getFieldValue();
    params.DNI = params.DNI || "";
    params.COD_CARRERA = params.COD_CARRERA || "";
    params.SEDE_EXAM = params.SEDE_EXAM || "";
    const resp = await buscarInscritoService(params);
    if (resp.status === 200) {
      message.success("Datos encontrados");
      setDataTable(resp.data);
      return;
    }
    message.error("Ocurrio un error");
    console.log(resp);
  };
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

        <Drawer title="Modificar carrera" placement="right" onClose={hiddenPanelEditInscritos} open={panelEditarInscritos}>
          <Form layout="vertical" form={formModificarInscritos} onFinish={modificarInscrito}>
            <Form.Item label="Carrera" name="COD_CARRERA">
              <Select
                showSearch
                placeholder="Selecciona una carrera"
                options={selectCarrerasCodigo}
              />
            </Form.Item>
            <Form.Item label="Sede" name="SEDE_EXAM">
              <Input />
            </Form.Item>
            <Form.Item label="Preparatoria" name="PREPARATORIA">
              <Input />
            </Form.Item>
            <Form.Item label="Termino secundaria" name="YEAR_CONCLU">
              <Input placeholder="Ingresa el año" />
            </Form.Item>
            <Form.Item >
              <Button htmlType="submit">Guardar</Button>
            </Form.Item>
            <Form.Item name="ID">
              <Input type="hidden"/>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </div>
  );
};

export default InscritoPage;
