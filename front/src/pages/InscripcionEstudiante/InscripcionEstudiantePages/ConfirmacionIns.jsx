import { Button, Form, Input } from 'antd'
import React, { useContext } from 'react'
import { EstudianteContext } from '../../../providers/EstudianteProvider'
import { message } from 'antd'

const ConfirmacionIns = () => {
    const [formConfirmacion] = Form.useForm()
    const { estudiante, setEstudiante } = useContext(EstudianteContext)
    const guardarConfirmacion = (params) => {
        console.log(params)
        if(params.PASSWORD !== params.PASSWORD_2) {
            message.error('Las contraseas no coindicen')
            return
        }
        setEstudiante({...estudiante, ...params})
    }
    return (
        <>
        <Form layout='vertical' form={formConfirmacion} onFinish={guardarConfirmacion}>
            <Form.Item label="Contraseña" name="PASSWORD">
                <Input placeholder="Basic usage" />
            </Form.Item>
            <Form.Item label="Repite Contraseña" name="PASSWORD_2">
                <Input placeholder="Basic usage" />
            </Form.Item>
            <Button htmlType='submit' >Guardar </Button>
        </Form>
        </>
    )
}

export default ConfirmacionIns