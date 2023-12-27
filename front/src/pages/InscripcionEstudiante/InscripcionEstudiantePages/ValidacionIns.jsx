import { Button, Form, Input } from 'antd'
import React from 'react'

const ValidacionIns = () => {
    return (
        <>
        <Form layout='vertical'>
            <Form.Item label="Correo Electronico">
                <Input placeholder="Basic usage" />
            </Form.Item>
            <Form.Item label="Codigo">
                <Input placeholder="Basic usage" />
            </Form.Item>
            <Form.Item >
                <Button label="Verificar" />
            </Form.Item>
        </Form>
        </>
    )
}

export default ValidacionIns