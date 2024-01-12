import axios from './axiosConfig'
const comprobarVoucherPorFechaService = async(params) => {
  try {
    const resp = await axios.post(`http://api.undac.edu.pe/admision/92d5a7e264d88f03bd9e9eb1ff3317ee/2c23a4111a4a7d678527854953afba65/get-payments?payment_date_start=${params}&payment_date_end=${params}`)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}

export { comprobarVoucherPorFechaService }