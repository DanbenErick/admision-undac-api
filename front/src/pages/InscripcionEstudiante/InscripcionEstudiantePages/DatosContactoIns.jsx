import { Button, Form, Input } from 'antd';
import React, { useContext } from 'react';
import { EstudianteContext } from '../../../providers/EstudianteProvider';

const DatosContactoIns = (props) => {
  const [formDatosContacto] = Form.useForm();
  const { setEstudiante, estudiante } = useContext(EstudianteContext);
  const guardarDatosContacto = (params) => {
    setEstudiante({ ...estudiante, ...params });
    props.setCurrent(props.current + 1);
  };
  const anteriorPage = () => props.setCurrent(props.current - 1);
  return (
    <>
      <Form
        layout="vertical"
        form={formDatosContacto}
        onFinish={guardarDatosContacto}
      >
        <Form.Item label="Celular" name="CELULAR">
          <Input placeholder="Basic usage" />
        </Form.Item>
        <Form.Item label="Correo Electronico" name="CORREO">
          <Input placeholder="Basic usage" />
        </Form.Item>
        <Button onClick={anteriorPage}>Anterior</Button>
        <Button type="primary" htmlType="submit">
          Siguiente
        </Button>
      </Form>
    </>
  );
};

export default DatosContactoIns;
