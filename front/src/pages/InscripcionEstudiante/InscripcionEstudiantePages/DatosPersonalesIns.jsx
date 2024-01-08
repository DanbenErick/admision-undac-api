import { Button, InputNumber } from 'antd'
import { Select } from 'antd'
import { Form, Input } from 'antd'
import React, { useContext } from 'react'
import { EstudianteContext } from '../../../providers/EstudianteProvider'
import { consultarEstudianteExisteService } from '../../../api/inscripcionEstudianteService'
import { message } from 'antd'

const DatosPersonalIncripcion = (props) => {
    const [formDatosPersonales] = Form.useForm()
    const { setEstudiante } = useContext(EstudianteContext)
    const guardarDatosPersonales = async (params) => {
        const resp = await consultarEstudianteExisteService({DNI: params.DNI})
        if(resp.data.length > 0) {
            message.info('Ya esta registrado')
            return
        } 
        setEstudiante(params)
        props.setCurrent(props.current + 1)
    }
    return (
        <>
        <Form layout='vertical' form={formDatosPersonales} onFinish={guardarDatosPersonales}>
            <Form.Item label="Tipo" name="TIPO_DOC" rules={[{required: true}]}>
                <Select options={[{value: 'DNI', label: 'DNI'}]} />
            </Form.Item>
            <Form.Item label="DNI" name="DNI" rules={[{required: true}]}>
                <InputNumber maxLength="8" placeholder="Ingresa tu numero de DNI" style={{width: '100%'}} />
            </Form.Item>
            <Form.Item label="Apellidos Paterno" name="AP_PATERNO" rules={[{required: true}]}>
                <Input placeholder="Tu apellido paterno" />
            </Form.Item>
            <Form.Item label="Apellidos Materno" name="AP_MATERNO" rules={[{required: true}]}>
                <Input placeholder="Tu apellido materno" />
            </Form.Item>
            <Form.Item label="Nombres" name="NOMBRES" rules={[{required: true}]}>
                <Input placeholder="Tu nombre" />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType='submit'>Siguiente</Button>
            </Form.Item>
        </Form>
        </>
    )
}

export default DatosPersonalIncripcion