import { Button, Form, Input } from 'antd'
import React from 'react'

const ConfirmacionIns = () => {
    return (
        <>
        <Form layout='vertical'>
            <Form.Item label="Contraseña">
                <Input placeholder="Basic usage" />
            </Form.Item>
            <Form.Item label="Repite Contraseña">
                <Input placeholder="Basic usage" />
            </Form.Item>
            <Button label="Terminar" />
        </Form>
        </>
    )
}

export default ConfirmacionIns