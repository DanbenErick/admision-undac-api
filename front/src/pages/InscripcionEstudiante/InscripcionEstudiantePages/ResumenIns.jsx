import { Form, Input } from "antd";
import React, { useContext, useEffect } from "react";
import { EstudianteContext } from "../../../providers/EstudianteProvider";

const ResumenIns = () => {
  const [formResumen] = Form.useForm()
  const { estudiante } = useContext(EstudianteContext)
  useEffect(() => {
    formResumen.setFieldsValue(estudiante)
  }, [estudiante, formResumen])
  return (
    <>
      <div className="ResumenStepIns">
        <Form layout="vertical" className="FormResumenStepIns" form={formResumen}>
          <Form.Item label="DNI" name="DNI">
            <Input disabled placeholder="Basic usage" />
          </Form.Item>
          <Form.Item label="Apellidos Paterno" name="APELLIDO_PATERNO">
            <Input disabled placeholder="Basic usage" />
          </Form.Item>
          <Form.Item label="Apellidos Materno" name="APELLIDO_MATERNO">
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
        </Form>
      </div>
    </>
  );
};

export default ResumenIns;
