import { Form, Input } from 'antd'
import React from 'react'

const DatosPersonalIncripcion = () => {
    return (
        <>
        <Form layout='vertical'>
            <Form.Item label="DNI">
                <Input placeholder="Basic usage" />
            </Form.Item>
            <Form.Item label="Apellidos Paterno">
                <Input placeholder="Basic usage" />
            </Form.Item>
            <Form.Item label="Apellidos Materno">
                <Input placeholder="Basic usage" />
            </Form.Item>
            <Form.Item label="Nombres">
                <Input placeholder="Basic usage" />
            </Form.Item>
        </Form>
        </>
    )
}

export default DatosPersonalIncripcion