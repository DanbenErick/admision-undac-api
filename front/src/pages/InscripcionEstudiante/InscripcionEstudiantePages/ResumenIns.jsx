import { Button, Form, Input } from 'antd';
import React, { useContext, useEffect } from 'react';
import { EstudianteContext } from '../../../providers/EstudianteProvider';

const ResumenIns = (props) => {
  const [formResumen] = Form.useForm();
  const { estudiante } = useContext(EstudianteContext);
  const anteriorPage = () => props.setCurrent(props.current - 1);
  const guardarCambio = () => {
    props.setCurrent(props.current + 1);
  };
  useEffect(() => {
    formResumen.setFieldsValue(estudiante);
  }, [estudiante, formResumen]);
  return (
    <>
      <div className="ResumenStepIns">
        <Form
          layout="vertical"
          className="FormResumenStepIns"
          form={formResumen}
          onFinish={guardarCambio}
        >
          <Form.Item label="DNI" name="DNI">
            <Input disabled placeholder="Basic usage" />
          </Form.Item>
          <Form.Item label="Apellidos Paterno" name="AP_PATERNO">
            <Input disabled placeholder="Basic usage" />
          </Form.Item>
          <Form.Item label="Apellidos Materno" name="AP_MATERNO">
            <Input disabled placeholder="Basic usage" />
          </Form.Item>
          <Form.Item label="Nombres" name="NOMBRES">
            <Input disabled placeholder="Basic usage" />
          </Form.Item>
          <Form.Item label="Celular" name="CELULAR">
            <Input disabled placeholder="Basic usage" />
          </Form.Item>
          <Form.Item label="Correo Electronico" name="CORREO">
            <Input disabled placeholder="Basic usage" />
          </Form.Item>
          <Button onClick={anteriorPage}>Anterior</Button>
          <Button type="primary" htmlType="submit">
            Siguiente
          </Button>
        </Form>
      </div>
    </>
  );
};

export default ResumenIns;
