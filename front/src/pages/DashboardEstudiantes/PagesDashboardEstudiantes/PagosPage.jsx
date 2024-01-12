import { Button, DatePicker, Form, Input } from 'antd'
import React from 'react'
import { comprobarVoucherPorFechaService } from '../../../api/pagosDashEstudiService'
import moment from 'moment'

const formatDateUtil = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const PagosEstudiantePage = () => {
  const [formPago] = Form.useForm()
  const comprobarPago = async(params) => {
    console.log(params)
    const fecha = formatDateUtil(new Date(params.FECHA_PAGO))
    console.log(fecha)
    const resp = await comprobarVoucherPorFechaService(fecha)
    console.log(resp)
  }
  return (
    <Form layout='vertical' form={formPago} onFinish={comprobarPago}>
    <div className="cardDashEstudiante">
            <div className="cardDashEstudianteHeader">
              <p>
                <i className="ri-group-2-fill"></i> Pagos Estudiante
              </p>
            </div>
            <div className="cardDashEstudianteBody">
              <div className="gridFormFormularioPagosEstudiante">
                <Form.Item
                  className="FormItem"
                  label="Codigo de pago "
                  name="COD_PAGO"
                  rules={[{ required: true }]}
                >
                  <Input maxLength={7} />
                </Form.Item>
                <Form.Item
                  className="FormItem"
                  label="Fecha de Pago"
                  name="FECHA_PAGO"
                  rules={[{ required: true }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item>
                  <Button htmlType='submit'>Comprobar</Button>
                </Form.Item>
              </div>
            </div>
          </div>
          </Form>
  )
}

export default PagosEstudiantePage