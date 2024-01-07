import React, { useEffect, useState } from "react";
import SpinnerComponent from "../../components/Spinner";
import { Breadcrumb, Button, Table } from "antd";
import { Card } from "antd";
import { Form } from "antd";
import { Input } from "antd";
import { SaveFilled, SearchOutlined } from "@ant-design/icons";
import {
  buscarEstudianteService,
  modificarEstudianteService,
  obtenerEstudiantesService,
} from "../../api/estudiantesAdmService";
import { Popconfirm } from "antd";
import { Drawer } from "antd";
import { Select } from "antd";
import { message } from "antd";
import moment from "moment";

const EstudiantesPage = () => {
  const [loading, setLoading] = useState();
  const [formEstudiantes] = Form.useForm();
  const [dataTable, setDataTable] = useState();
  const [formModificarEstudiante] = Form.useForm();
  const [panelEditarEstudiante, setPanelEditarEstudiante] = useState(false);
  const columnsTable = [
    {
      title: "DNI",
      dataIndex: "DNI",
      key: "DNI",
    },
    {
      title: "NOMBRE COMPLETO",
      dataIndex: "NOMBRE_COMPLETO",
      key: "NOMBRE_COMPLETO",
    },
    {
      title: "Celular",
      dataIndex: "CELULAR",
      key: "CELULAR",
    },
    {
      title: "Correo",
      dataIndex: "CORREO",
      key: "CORREO",
    },
    {
      title: "Fecha",
      dataIndex: "FECHA_REGISTRO",
      key: "FECHA_REGISTRO",
      render: (data) => moment(data).format("YYYY/MM/DD"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, column) => {
        // if (column.ESTADO === 1) {
        return (
          <Popconfirm
            title="Carerra"
            description="Quieres editar este carrera?"
            onConfirm={() => {
              showPanelEditEstudiante({ ID: column.ID });
            }}
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
  const showPanelEditEstudiante = async (params) => {
    const data = dataTable.find((carrera) => carrera.ID === params.ID);
    console.log(params);
    console.log(data);
    formModificarEstudiante.setFieldsValue(data);
    // formModificarCarreras.setFieldsValue(data)
    setPanelEditarEstudiante(true);
  };
  const initialValues = {
    DNI: "",
    CORREO: "",
    CELULAR: "",
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
  const refreshTable = async () => {
    const resp = await obtenerEstudiantesService();
    setDataTable(resp.data);
  };
  const buscarEstudiante = async () => {
    const params = formEstudiantes.getFieldValue();
    params.DNI = params.DNI || "";
    params.CORREO = params.CORREO || "";
    params.CELULAR = params.CELULAR || "";
    if (params.DNI === "" && params.CORREO === "" && params.CELULAR === "") {
      refreshTable();
      return;
    }

    const resp = await buscarEstudianteService(params);
    setDataTable(resp.data);
  };
  useEffect(() => {
    refreshTable();
  }, []);

  return (
    <div>
      {loading ? <SpinnerComponent /> : ""}
      <div className="contentDashboard">
        <h1 class="titlePageDashboard">Estudiantes</h1>
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
  );
};

export default EstudiantesPage;
