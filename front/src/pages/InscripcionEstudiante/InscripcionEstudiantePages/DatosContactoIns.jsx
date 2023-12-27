import { Form, Input } from 'antd'
import React from 'react'

const DatosContactoIns = () => {
    return (
        <>
        <Form layout='vertical'>
            <Form.Item label="Celular">
                <Input placeholder="Basic usage" />
            </Form.Item>
            <Form.Item label="Correo Electronico">
                <Input placeholder="Basic usage" />
            </Form.Item>
        </Form>
        </>
    )
}

export default DatosContactoIns