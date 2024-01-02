import { Button, InputNumber } from 'antd'
import { Select } from 'antd'
import { Form, Input } from 'antd'
import React, { useContext } from 'react'
import { EstudianteContext } from '../../../providers/EstudianteProvider'

const DatosPersonalIncripcion = () => {
    const [formDatosPersonales] = Form.useForm()
    const { setEstudiante } = useContext(EstudianteContext)
    const guardarDatosPersonales = (params) => {
        setEstudiante(params)
    }
    return (
        <>
        <Form layout='vertical' form={formDatosPersonales} onFinish={guardarDatosPersonales}>
            <Form.Item label="Tipo">
                <Select options={[{value: 'DNI', label: 'DNI'}]} />
            </Form.Item>
            <Form.Item label="DNI" name="DNI">
                <InputNumber maxLength="8" placeholder="Ingresa tu numero de DNI" style={{width: '100%'}} />
            </Form.Item>
            <Form.Item label="Apellidos Paterno" name="APELLIDO_PATERNO">
                <Input placeholder="Tu apellido paterno" />
            </Form.Item>
            <Form.Item label="Apellidos Materno" name="APELLIDO_MATERNO">
                <Input placeholder="Tu apellido materno" />
            </Form.Item>
            <Form.Item label="Nombres" name="NOMBRES">
                <Input placeholder="Tu nombre" />
            </Form.Item>
            <Form.Item >
                <Button primary htmlType='submit'>Guardar</Button>
            </Form.Item>
        </Form>
        </>
    )
}

export default DatosPersonalIncripcion