import React, { useEffect, useState } from "react"
import SpinnerComponent from "../../components/Spinner"
import { Breadcrumb, Button, Card, Table } from "antd"
import { Select } from "antd"
import { InputNumber } from "antd";
import { Form } from "antd";
import { Popconfirm } from "antd";
import '../../assets/styles/VacantesPage.css'
import { message } from "antd";
import { SaveFilled, SearchOutlined } from "@ant-design/icons";


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
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    })

    return (
        <div>
            {loading ? <SpinnerComponent /> : ""}
            <div className="contentDashboard">
                <h1 class="titlePageDashboard">Vacantes</h1>
                <Breadcrumb className='bradcrumpPadding'>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Vacantes</Breadcrumb.Item>
                </Breadcrumb>
                <Card type="inner" title="Crear vacantes" >
                    <Form layout="vertical">
                        <div className="vacantesPageContainerFormCrearVacante">
                            <Form.Item label="Proceso">
                                <Select
                                    options={[
                                        {
                                            value: 'lucy',
                                            label: 'Lucy',
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item label="Carrera">
                                <Select
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    filterOption={filterOption}
                                    options={[
                                        {
                                            value: 'jack',
                                            label: 'Jack',
                                        },
                                        {
                                            value: 'lucy',
                                            label: 'Lucy',
                                        },
                                        {
                                            value: 'tom',
                                            label: 'Tom',
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item label="Cantidad de vacantes">
                                <InputNumber min={1} max={10} defaultValue={3} onChange={""} style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item className="filaBotones" >
                                <Popconfirm
                                    title="Proceso"
                                    description="Estas seguro de guardar el proceso?"
                                    onConfirm={confirm}
                                    onCancel={cancel}
                                    okText="Si"
                                    cancelText="No"
                                >
                                    <Button type="primary" icon={<SaveFilled />}>Guardar Cambios</Button>
                                </Popconfirm>
                                <Button icon={<SearchOutlined />}>Buscar</Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Card>
                <Card type="inner" title="Lista de vacantes" >
                    <Table dataSource={""} columns={""} size="small" />
                </Card>
            </div>
        </div>
    )
}

export default VacantesPage