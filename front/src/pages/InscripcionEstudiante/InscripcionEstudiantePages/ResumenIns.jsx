import { Form, Input } from "antd";
import React from "react";

const ResumenIns = () => {
  return (
    <>
      <div className="ResumenStepIns">
        <Form layout="vertical" className="FormResumenStepIns">
          <Form.Item label="DNI">
            <Input disabled placeholder="Basic usage" />
          </Form.Item>
          <Form.Item label="Apellidos Paterno">
            <Input disabled placeholder="Basic usage" />
          </Form.Item>
          <Form.Item label="Apellidos Materno">
            <Input disabled placeholder="Basic usage" />
          </Form.Item>
          <Form.Item label="Nombres">
            <Input disabled placeholder="Basic usage" />
          </Form.Item>
          <Form.Item label="Celular">
            <Input disabled placeholder="Basic usage" />
          </Form.Item>
          <Form.Item label="Correo Electronico">
            <Input disabled placeholder="Basic usage" />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ResumenIns;
