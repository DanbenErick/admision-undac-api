import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { FloatButton } from 'antd'
import React from 'react'

const BtnActionComponent = () => {
    return (
        <FloatButton.Group
            trigger="click"
            type="primary"
            style={{
                right: 24,
            }}
            tooltip={<div>Danben</div>}
            icon={<UserOutlined />}>
            <FloatButton type="primary" icon={<LogoutOutlined />} tooltip={<div>Salir</div>} />
            <FloatButton type="primary" icon={<SettingOutlined />} tooltip={<div>Configuracion</div>} />
        </FloatButton.Group>
    )
}

export default BtnActionComponent