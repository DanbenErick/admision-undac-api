import { Button, Form, Input } from 'antd'
import React, { useContext } from 'react'
import { EstudianteContext } from '../../../providers/EstudianteProvider'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { registrarEstudianteService } from '../../../api/inscripcionEstudianteService'

const ConfirmacionIns = (props) => {
    const [formConfirmacion] = Form.useForm()
    const { estudiante, setEstudiante } = useContext(EstudianteContext)
    const navigate = useNavigate()
    const guardarConfirmacion = async (params) => {
        console.log(params)
        if(params.PASSWORD !== params.PASSWORD_2) {
            message.error('Las contraseas no coindicen')
            return
        }
        setEstudiante({...estudiante, PASSWORD: params.PASSWORD})
        console.log(estudiante)
        const resp = await registrarEstudianteService(estudiante)
        console.log(resp)
        if(!resp.data.ok) {
            message.error(resp.data.message);
            return
        }
        
        message.success(resp.data.message);
        navigate('/dashboard-estudiantes/home');
    }
    const anteriorPage = () => props.setCurrent(props.current - 1)
    return (
        <>
        <Form layout='vertical' form={formConfirmacion} onFinish={guardarConfirmacion}>
            <Form.Item label="Contraseña" name="PASSWORD">
                <Input.Password placeholder="Basic usage" />
            </Form.Item>
            <Form.Item label="Repite Contraseña" name="PASSWORD_2">
                <Input.Password placeholder="Basic usage" />
            </Form.Item>
            <Button onClick={anteriorPage}>Anterior</Button>
            <Button type="primary" htmlType='submit'>Terminar</Button>
        </Form>
        </>
    )
}

export default ConfirmacionIns