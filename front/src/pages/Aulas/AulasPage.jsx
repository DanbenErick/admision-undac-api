import { Breadcrumb, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import SpinnerComponent from '../../components/Spinner';
import { Card } from 'antd';
import { Form } from 'antd';
import { Select } from 'antd';
import { SaveFilled, SearchOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { Input } from 'antd';
import { obtenerProcesosForm } from '../../api/apiInpputs';

const AulasPage = () => {
  const [loading, setLoading] = useState();
  const [formAulas] = Form.useForm();
  const [inputProcesos, setInputProcesos] = useState();
  const guardarAulas = async () => {};
  const buscarAula = async () => {};
  const getInputs = async () => {
    const resp = await obtenerProcesosForm();
    setInputProcesos(resp.data);
  };
  useEffect(() => {
    setLoading(true)
    getInputs();
    setLoading(false)
  }, []);
  return (
    <div>
      {loading ? <SpinnerComponent /> : ''}
      <div className="contentDashboard">
        <h1 class="titlePageDashboard">Aulas</h1>
        <Breadcrumb className="bradcrumpPadding">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Aulas</Breadcrumb.Item>
        </Breadcrumb>
        <Card type="inner" title="Crear aula">
          <Form layout="vertical" form={formAulas} onFinish={guardarAulas}>
            <div className="vacantesPageContainerFormCrearVacante">
              <Form.Item label="Proceso">
                <Select
                  showSearch
                  placeholder="Selecciona un proceso"
                  options={inputProcesos}
                />
              </Form.Item>
              <Form.Item label="Nombre Aula">
                <Input />
              </Form.Item>
              <Form.Item label="Capacidad">
                <Input />
              </Form.Item>
              <Form.Item label="Area">
                <Input />
              </Form.Item>
            </div>
            <Form.Item className="filaBotones">
              <Popconfirm
                title="Proceso"
                description="Estas seguro de guardar el proceso?"
                onConfirm={() => formAulas.submit()}
                onCancel={''}
                okText="Si"
                cancelText="No"
              >
                <Button type="primary" icon={<SaveFilled />}>
                  Guardar Cambios
                </Button>
              </Popconfirm>
              <Button icon={<SearchOutlined />} onClick={buscarAula}>
                Buscar
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card type="inner" title="Lista de Vouchers">
          {/* <Table dataSource={dataTable} columns={columnsTable} size="small" /> */}
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

export default AulasPage;
