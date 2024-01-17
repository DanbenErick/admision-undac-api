import { Request, Response, Router } from 'express'
import asyncHandler from 'express-async-handler'
import { EstudiantesService } from '../../services/administrador/estudiantes/Estudiante.service'




class EstudianteController {
    public router: Router
    public estudianteService: EstudiantesService
    
    public constructor() {
        this.estudianteService = new EstudiantesService()
        this.router = Router()
        this.routes()
    }
    public obtenerEstudiantes = async(req: Request, res: Response) => {
        try {
            const result = await this.estudianteService.obtenerEstudiantes()
            res.status(200).json(result)
        }catch(error){
            res.status(500).json(error)
        }
    }
    public buscarEstudiante = async(req: Request, res: Response) => {
      try {
        const params = req.body
        const resp = await this.estudianteService.buscarCarreraPorFacultad(params)
        res.status(200).json(resp)
      }catch(error) {
        res.status(500).json(error)
      }
    }
    public modificarEstudiante = async(req: Request, res: Response) => {
      try {
        const params = req.body
        const resp = await this.estudianteService.modificarEstudiante(params)
        res.status(200).json(resp)
      }catch(error) {
        res.status(500).json(error)
      }
    }
    public registrarEInscribirEstudiante = async(req: Request, res: Response) => {
      try {
        const params = req.body
        console.log("PARAMETROS", params)
        const resp = await this.estudianteService.registrarEInscribirEstudiante(params)
        res.status(200).json(resp)
      }catch(error) {
        res.status(500).json(error)
      }
    }
    
    public routes() {
        this.router.get('/obtener-estudiantes', asyncHandler(this.obtenerEstudiantes))
        this.router.post('/buscar-estudiante', asyncHandler(this.buscarEstudiante))
        this.router.put('/modificar-estudiante', asyncHandler(this.modificarEstudiante))
        this.router.post('/registrar-inscribir-estudiante', asyncHandler(this.registrarEInscribirEstudiante))
    }
}
export default EstudianteController