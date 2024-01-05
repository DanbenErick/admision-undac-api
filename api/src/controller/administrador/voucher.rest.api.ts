import { Request, Response, Router } from 'express'
import asyncHandler from 'express-async-handler'
import { VoucherService } from '../../services/administrador/voucher/Voucher.service'
import { VoucherInterface } from '../../interfaces/administrador/voucher.interface'


class VoucherController {
    public router: Router
    public voucherService: VoucherService
    
    public constructor() {
        this.voucherService = new VoucherService()
        this.router = Router()
        this.routes()
    }
    public obtenerVouchers = async(req: Request, res: Response) => {
        try {
            const params = {}
            const result = await this.voucherService.obtenerVouchers()
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
    }
    public buscarVoucher = async(req: Request, res: Response) => {
        try {
            const params: VoucherInterface = req.body
            const resp = await this.voucherService.buscarVoucher(params)
            res.status(200).json(resp)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public buscarEstudianteParaVoucher = async(req: Request, res:Response) => {
        try {
            const params: VoucherInterface = req.body
            const resp = await this.voucherService.buscarEstudianteParaVoucher(params)
            res.status(200).json(resp)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public crearVoucher = async(req: Request, res: Response) => {
        try {
            const params: VoucherInterface = req.body
            const resp = await this.voucherService.crearVoucher(params)
            res.status(200).json(resp)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public routes() {
        this.router.get('/obtener-vouchers', asyncHandler(this.obtenerVouchers))

        this.router.post('/buscar-voucher', asyncHandler(this.buscarVoucher))
        this.router.post('/buscar-estudiante-parar-voucher', asyncHandler(this.buscarEstudianteParaVoucher))
        this.router.post('/crear-voucher', asyncHandler(this.crearVoucher))
        
    
    }
}
export default VoucherController