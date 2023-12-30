import { Request, Response, Router } from 'express'
import asyncHandler from 'express-async-handler'
import { VacantesService } from '../../services/administrador/vacantes/Vacantes.service'
import { VacantesInterface } from '../../interfaces/administrador/vacantes.interface'

class VacantesController {
    public router: Router
    public vacantesService: VacantesService
    
    public constructor() {
        this.vacantesService = new VacantesService()
        this.router = Router()
        this.routes()
    }
    public obtenerVacantes = async(req: Request, res: Response) => {
        try {
            const params = {}
            const result = await this.vacantesService.obtenerVacantes(params)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
    }
    public obtenerVacantesPorProceso = async(req: Request, res:Response) => {
        try {
            const params = {ID_PROCESO: Number(req.query.ID_PROCESO)}
            const result = await this.vacantesService.obtenerVacantesPorProceso(params)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public verificarDisponibilidadProceso = async(req: Request, res:Response) => {
        try {
            const params: VacantesInterface = {ID_PROCESO: Number(req.query.ID_PROCESO)}
            const result = await this.vacantesService.verificarDisponibilidadProceso(params)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public crearVacante = async(req: Request, res: Response) => {
        try {
            const params: VacantesInterface = req.body
            const result = await this.vacantesService.crearVacante(params)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public oobtenerCarrerasPorProcesoInput = async(req: Request, res: Response) => {
        try {
            const result = await this.vacantesService.obtenerCarrerasPorProcesoInput()
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public routes() {
        this.router.get('/obtener-vacantes', this.obtenerVacantes)
        this.router.get('/obtener-vacantes-proceso', this.obtenerVacantesPorProceso)
        this.router.get('/verificar-proceso-id', this.verificarDisponibilidadProceso)
        this.router.get('/obtener-carreras-inputs', this.oobtenerCarrerasPorProcesoInput)
        
        this.router.post('/crear-vacante', this.crearVacante)
    
    }
}
export default VacantesController