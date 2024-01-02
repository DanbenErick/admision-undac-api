import { Button, Form, Input } from 'antd'
import React, { useContext } from 'react'
import { EstudianteContext } from '../../../providers/EstudianteProvider'

const DatosContactoIns = () => {
    const [formDatosContacto] = Form.useForm()
    const { setEstudiante, estudiante } = useContext(EstudianteContext)
    const guardarDatosContacto = (params) => {
        setEstudiante({...estudiante, ...params})
    }
    return (
        <>
        <Form layout='vertical' form={formDatosContacto} onFinish={guardarDatosContacto}>
            <Form.Item label="Celular" name="CELULAR">
                <Input placeholder="Basic usage" />
            </Form.Item>
            <Form.Item label="Correo Electronico" name="CORREO">
                <Input placeholder="Basic usage" />
            </Form.Item>
            <Button htmlType='submit'>Guardar</Button>
        </Form>
        </>
    )
}

export default DatosContactoIns