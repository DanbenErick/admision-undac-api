import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Table } from 'antd';
import { Card } from 'antd';
import { Form } from 'antd';
import { Input } from 'antd';
import { Radio } from 'antd';
import { DatePicker } from 'antd';
import SpinnerCompoent from '../../components/Spinner'
import { Popconfirm } from 'antd';

export default function ProcesosPage() {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    })


    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <div>
            {loading ? (
                <SpinnerCompoent />
            ) : ""}
            <div className='contentDashboard'>
                <h1 class="titlePageDashboard">Procesos</h1>
                <Breadcrumb className='bradcrumpPadding'>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Procesos</Breadcrumb.Item>
                </Breadcrumb>
                <Card type="inner" title="Crear proceso" >
                    <Form layout='vertical'>
                        <Form.Item label="Nombre del proceso" >
                            <Input className='fullSizeInput' />
                        </Form.Item>
                        <Form.Item label="Fecha de inicio" >
                            <DatePicker placeholder='' onChange={""} className='fullSizeInput' />
                        </Form.Item>
                        <Form.Item label="Estado del proceso" >
                            <Radio.Group defaultValue="1" buttonStyle="solid">
                                <Radio.Button value="1">Abierto</Radio.Button>
                                <Radio.Button value="0">Cerrado</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item >
                            <Popconfirm
                                title="Proceso"
                                description="Estas seguro de guardar el proceso?"
                                onConfirm={() => alert("Guardando")}
                                onCancel={() => alert("Borrando")}
                                okText="Si"
                                cancelText="No"
                            >
                                <Button type="primary">Guardar Cambios</Button>
                            </Popconfirm>
                        </Form.Item>
                    </Form>
                </Card>
                <Card type="inner" title="Lista de procesos">
                    <Table dataSource={dataSource} columns={columns} size="small" />
                </Card>
            </div>
        </div>
    )
}