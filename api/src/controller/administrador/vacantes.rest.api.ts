import { Request, Response, Router } from 'express'
import asyncHandler from 'express-async-handler'
import { VacantesService } from '../../services/administrador/vacantes/Vacantes.service'

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
    public routes() {
        this.router.get('/obtener-vacantes',)
    }
}