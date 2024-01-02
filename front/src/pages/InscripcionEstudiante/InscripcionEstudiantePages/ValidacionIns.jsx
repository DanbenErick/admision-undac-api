import { Button, Form, Input } from 'antd'
import React, { useContext, useEffect } from 'react'
import { EstudianteContext } from '../../../providers/EstudianteProvider'

const ValidacionIns = () => {
    const { estudiante } = useContext(EstudianteContext)
    const [formValidacion] = Form.useForm()
    useEffect(() => {
        formValidacion.setFieldsValue(estudiante)
    },[estudiante, formValidacion])
    return (
        <>
        <Form layout='vertical' form={formValidacion}>
            <Form.Item label="Correo Electronico" name="CORREO">
                <Input placeholder="Basic usage" disabled />
            </Form.Item>
            <Form.Item label="Codigo" name="CODIGO">
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