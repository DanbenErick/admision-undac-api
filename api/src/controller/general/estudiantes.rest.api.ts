import { Request, Response, Router } from 'express'
import asyncHandler from 'express-async-handler'
import { EstudiantesGeneralService } from '../../services/general/estudiantes/EstudianteGeneral.service'
import { EstudianteInterface } from '../../interfaces/administrador/estudiantes.interface'



class EstudianteController {
    public router: Router
    public estudianteService: EstudiantesGeneralService
    
    public constructor() {
        this.estudianteService = new EstudiantesGeneralService()
        this.router = Router()
        this.routes()
    }
    public consultarEstudianteExiste = async(req: Request, res: Response) => {
        try {
            const params: EstudianteInterface = req.body
            const result = await this.estudianteService.consultarEstudianteExiste(params)
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
    }
    public registrarEstudiante = async(req: Request, res: Response) => {
        try {
            const params: EstudianteInterface = req.body
            const resp = await this.estudianteService.registrarEstudiante(params)
            res.status(200).json(resp)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    
    public routes() {
        this.router.post('/consultar-dni', asyncHandler(this.consultarEstudianteExiste))
        this.router.post('/registrar-estudiante', asyncHandler(this.registrarEstudiante))
        
        
    
    }
}
export default EstudianteController