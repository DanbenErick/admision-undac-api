import React, { useEffect, useState } from "react"
import SpinnerComponent from "../../components/Spinner"
import { message, Popconfirm, Form, InputNumber, Select, Breadcrumb, Button, Card, Table } from "antd"
import { SaveFilled, SearchOutlined } from "@ant-design/icons";
import { obtenerCarrerasForm, obtenerProcesosForm } from '../../api/apiInpputs'
import '../../assets/styles/VacantesPage.css'
import { crearVacante, obtenerVacantesProcesoActivo, verificarDisponibilidadProceso, obtenerCarrerasPorProcesoInput, obtenerVacantesPorId } from "../../api/apiVacantes";

const onChange = (value) => {
    console.log(`selected ${value}`);
};
const onSearch = (value) => {
    console.log('search:', value);
};

const filterOption = (input, option) => {
    return (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
}
const confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
};
const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
};

const VacantesPage = () => {
    const [formVacante] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const [loading, setLoading] = useState(true)
    const [inputProcesos, setInputProcesos] = useState([])
    const [inputCarrera, setInputCarrera] = useState([])
    const [botonDisabled, setBotonDisabled] = useState(true)
    const [dataTable, setDataTable] = useState([])
    const initialValues = {
        ID_PROCESO: '',
        ID_CARRERA: '',
        CANTIDAD: ''
    }
    const refreshDataVacatesProcesoActivo = async() => {
        try {
            const resp = await obtenerVacantesProcesoActivo()
            setDataTable(resp.data)
        }catch(error) {
            console.log('Error ', error)
        }
    }
    const getProcesosInputs = async () => {
        try {
            const resp = await obtenerProcesosForm()
            console.log(resp.data)
            setInputProcesos(resp.data)
        } catch (error) {
            console.log('Error ', error)
        }
    }
    
    const refreshCarrerasInput = async () => {
        try {
            const resp = await obtenerCarrerasPorProcesoInput()
            console.log(resp.data)
            setInputCarrera(resp.data)
        } catch (error) {
            console.error('Error', error)
        }
    }
    useEffect(() => {
        getProcesosInputs()
        refreshCarrerasInput()
        refreshDataVacatesProcesoActivo()
        // setTimeout(() => {
        //     setLoading(false)
        // }, 1000)
        setLoading(false)
    }, [])
    const columnsTable = [
        {
            title: 'Proceso',
            dataIndex: 'NOMBRE_PROCESO',
            key: 'NOMBRE_PROCESO'
        },
        {
            title: 'Escuela',
            dataIndex: 'NOMBRE_ESCUELA',
            key: 'NOMBRE_ESCUELA'
        },
        {
            title: 'Area',
            dataIndex: 'AREA',
            key: 'AREA'
        },
        {
            title: 'Cantidad',
            dataIndex: 'CANTIDAD',
            key: 'CANTIDAD'
        },
    ]
    const verificarEstadoProceso = async(data) => {
        console.log("valor", data)
        const resp = await verificarDisponibilidadProceso(data)
        // debugger
        if(!resp.data.ok){
            messageModal('warning', resp.data.message)
            setBotonDisabled(true)
        }else {setBotonDisabled(false)}
    }
    const guardarDatos = async (values) => {
        setLoading(true)
        values.USUARIO_REGISTRO = 1
        values.AREA = 1
        console.log(values)
        const resp = await crearVacante(values)
        console.log(resp)
        await refreshDataVacatesProcesoActivo()
        await refreshCarrerasInput()
        formVacante.resetFields()
        setLoading(false)
        // const resp = await crear
    }
    const buscarVacantesPorProceso = async () => {
        const ID_PROCESO = formVacante.getFieldValue('ID_PROCESO')
        console.log(ID_PROCESO)
        const resp = await obtenerVacantesPorId(ID_PROCESO)
        setDataTable(resp.data)
        console.log(resp)
    }
    const messageModal = (type, content) => {
        messageApi.open({type,content})
    }
    return (
        <div>
            {contextHolder}
            {loading ? <SpinnerComponent /> : ""}
            <div className="contentDashboard">
                <h1 class="titlePageDashboard">Vacantes</h1>
                <Breadcrumb className='bradcrumpPadding'>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Vacantes</Breadcrumb.Item>
                </Breadcrumb>
                <Card type="inner" title="Crear vacantes" >
                    <Form layout="vertical" form={formVacante} initialValues={initialValues} onFinish={guardarDatos}>
                        <div className="vacantesPageContainerFormCrearVacante">
                            <Form.Item label="Proceso" name="ID_PROCESO">
                                <Select
                                    showSearch
                                    placeholder="Selecciona el proceso"
                                    options={inputProcesos}
                                    onChange={verificarEstadoProceso}
                                />
                            </Form.Item>
                            <Form.Item label="Carrera" name="ID_CARRERA">
                                <Select
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    
                                    onSearch={onSearch}
                                    filterOption={filterOption}
                                    options={inputCarrera}
                                />
                            </Form.Item>
                            <Form.Item label="Cantidad de vacantes" name="CANTIDAD">
                                <InputNumber min={1} max={20} style={{width: '100%'}} />
                            </Form.Item>

                            <Form.Item className="filaBotones" >
                                <Popconfirm
                                    title="Proceso"
                                    description="Estas seguro de guardar el proceso?"
                                    onConfirm={() => formVacante.submit()}
                                    onCancel={cancel}
                                    okText="Si"
                                    cancelText="No"
                                >
                                    <Button type="primary" disabled={botonDisabled} icon={<SaveFilled />}>Guardar Cambios</Button>
                                </Popconfirm>
                                <Button icon={<SearchOutlined />} onClick={buscarVacantesPorProceso}>Buscar</Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Card>
                <Card type="inner" title="Lista de vacantes" >
                    <Table dataSource={dataTable} columns={columnsTable} size="small" />
                </Card>
            </div>
        </div>
    )
}

export default VacantesPage