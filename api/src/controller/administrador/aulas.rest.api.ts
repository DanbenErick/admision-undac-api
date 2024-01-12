import { Request, Response, Router } from 'express'
import asyncHandler from 'express-async-handler'
import { AulasService } from '../../services/administrador/aulas/aulas.service'
import { AulasInterface } from '../../interfaces/administrador/aulas.interface'


class AulasController {
    public router: Router
    public aulasService: AulasService
    
    public constructor() {
        this.aulasService = new AulasService()
        this.router = Router()
        this.routes()
    }
    public obtenerAulas = async(req: Request, res: Response) => {
        try {
            const result = await this.aulasService.obtenerAulas()
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
    }
    public crearAula = async(req: Request, res:Response) => {
        try {
            const params: AulasInterface = req.body
            const result = await this.aulasService.registrarNuevoAula(params)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public modificarAula = async(req: Request, res: Response) => {
        try {
            const params: AulasInterface = req.body
            const result = await this.aulasService.modificarAula(params)
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public buscarAula = async(req: Request, res: Response) => {
      try {
        const params: AulasInterface = req.body
        const result = await this.aulasService.buscarAula(params)
        res.status(200).json(result)
      }catch(error) {
        res.status(500).json(error)
      }
    }
    public routes() {
        this.router.get('/obtener-aulas', asyncHandler(this.obtenerAulas))
        this.router.post('/buscar-aula', asyncHandler(this.buscarAula))
        this.router.post('/crear-aula', asyncHandler(this.crearAula))
        this.router.put('/modificar-aula', asyncHandler(this.modificarAula))
        
    
    }
}
export default AulasController