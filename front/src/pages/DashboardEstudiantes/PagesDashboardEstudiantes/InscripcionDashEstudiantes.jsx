
import { SaveFilled } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'


const InscripcionDashboardEstudiante = () => {
    const [formApoderadoDisabled, setFormApoderadoDisabled] = useState(false)
    const [formInscripcionDissabled, setFormInscripcionDissabled] = useState(false)
    const [formDatosComplementariosDisabled, setFormDatosComplementariosDisabled] = useState(false)
    const guardarDatosApoderado = () => {
        setFormApoderadoDisabled(true)
    }
    const guardarDatosComplementarios = () => {
        setFormDatosComplementariosDisabled(true)
    }
    const guardarDatosInscripcion = () => {
        setFormInscripcionDissabled(true)
    }
    return (
        <>
            <h1>Datos</h1>
            <div className="gridInscripcionEstudianteDashboard">
                <div className="cardDashEstudiante">
                    <div className="cardDashEstudianteHeader">
                        <p>Apoderado</p>
                    </div>
                    <div className="cardDashEstudianteBody">
                        <Form layout='vertical'>
                            <div className="gridFormFormularioApoderado">
                                <Form.Item className='FormItem' label="Apellido y nombres">
                                    <Input disabled={formApoderadoDisabled} />
                                </Form.Item>
                                <Form.Item className='FormItem' label="Numero de celular ">
                                    <Input disabled={formApoderadoDisabled} />
                                </Form.Item>
                                <Form.Item className='FormItem' label="Numero de DNI">
                                    <Input disabled={formApoderadoDisabled} />
                                </Form.Item>
                            </div>
                            {!formApoderadoDisabled 
                            ?
                                <Button type="primary" block icon={<SaveFilled />} onClick={guardarDatosApoderado}>Guardar</Button>
                            :
                                ""
                            }
                        </Form>
                    </div>
                </div>
                <div className="cardDashEstudiante">
                    <div className="cardDashEstudianteHeader">
                        <p>Formulario de inscripcion</p>
                    </div>
                    <div className="cardDashEstudianteBody">
                        <Form layout='vertical'>
                            <div className="gridFormFormularioInscripcion">
                                <Form.Item className='FormItem' label="Modalidad">
                                    <Input disabled={formInscripcionDissabled} />
                                </Form.Item>
                                <Form.Item className='FormItem' label="Programa de Estudio">
                                    <Input disabled={formInscripcionDissabled} />
                                </Form.Item>
                                <Form.Item className='FormItem' label="Año termino secundaria ">
                                    <Input disabled={formInscripcionDissabled} />
                                </Form.Item>
                                <Form.Item className='FormItem' label="Tipo de Colegio">
                                    <Input disabled={formInscripcionDissabled} />
                                </Form.Item>
                                <Form.Item className='FormItem' label="Nombre de Colegio">
                                    <Input disabled={formInscripcionDissabled} />
                                </Form.Item>
                                <Form.Item className='FormItem' label="Sede de Examen">
                                    <Input disabled={formInscripcionDissabled} />
                                </Form.Item>
                            </div>
                            {!formInscripcionDissabled 
                            ?
                                <Button type="primary" block icon={<SaveFilled />} onClick={guardarDatosInscripcion}>Guardar</Button>
                            :
                                ""
                            }
                        </Form>
                    </div>
                </div>
                <div className="cardDashEstudiante">
                    <div className="cardDashEstudianteHeader">
                        <p>Datos Complementarios</p>
                    </div>
                    <div className="cardDashEstudianteBody">
                        <Form layout='vertical'>
                            <div className="gridFormDatosComplementarios">
                                <Form.Item className='FormItem' label="Genero">
                                    <Input disabled={formDatosComplementariosDisabled} />
                                </Form.Item>
                                <Form.Item className='FormItem' label="Fecha de Nacimiento ">
                                    <Input disabled={formDatosComplementariosDisabled} />
                                </Form.Item>
                                <Form.Item className='FormItem' label="Lugar de nacimiento">
                                    <Input disabled={formDatosComplementariosDisabled} />
                                </Form.Item>
                                <Form.Item className='FormItem' label="Direccion Actual">
                                    <Input disabled={formDatosComplementariosDisabled} />
                                </Form.Item>
                                <Form.Item className='FormItem' label="Sede de Examen">
                                    <Input disabled={formDatosComplementariosDisabled} />
                                </Form.Item>
                                <Form.Item className='FormItem' label="¿Tiene discapacidad?">
                                    <Input disabled={formDatosComplementariosDisabled} />
                                </Form.Item>
                                <Form.Item className='FormItem' label="Tipo de Discapacidad">
                                    <Input disabled={formDatosComplementariosDisabled} />
                                </Form.Item>
                                <Form.Item className='FormItem' label="Identidad Etnica">
                                    <Input disabled={formDatosComplementariosDisabled} />
                                </Form.Item>
                                <Form.Item className='FormItem' label="Celular">
                                    <Input disabled={formDatosComplementariosDisabled} />
                                </Form.Item>
                                <Form.Item className='FormItem' label="Telefono Fijo">
                                    <Input disabled={formDatosComplementariosDisabled} />
                                </Form.Item>
                                <Form.Item className='FormItem' label="Foto">
                                    <Input disabled={formDatosComplementariosDisabled} />
                                </Form.Item>
                            </div>
                            {!formDatosComplementariosDisabled
                            ?
                                <Button type="primary" block icon={<SaveFilled />} onClick={guardarDatosComplementarios}>Guardar</Button>
                            :
                                ""
                            }
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InscripcionDashboardEstudiante