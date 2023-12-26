import React, { useEffect, useState } from 'react'
import SpinnerComponent from '../../components/Spinner'
import { Breadcrumb } from 'antd'
import { Card } from 'antd'

const CarreraPage = () => {
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
                <h1 class="titlePageDashboard">Carreras</h1>
                <Breadcrumb className='bradcrumpPadding'>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Carreras</Breadcrumb.Item>
                </Breadcrumb>
                <Card type="inner" title="Crear proceso" >
                    
                </Card>
                <Card type="inner" title="Lista de Vacantes" >
                    
                </Card>
            </div>
        </div>
    )
}

export default CarreraPage