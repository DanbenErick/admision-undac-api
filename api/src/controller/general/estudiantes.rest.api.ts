import { Request, Response, Router } from 'express'
import asyncHandler from 'express-async-handler'
import { EstudiantesGeneralService } from '../../services/general/estudiantes/EstudianteGeneral.service'
import { EstudianteInterface } from '../../interfaces/administrador/estudiantes.interface'
import multer from 'multer'
import jwt from 'jsonwebtoken'

const storage = multer.diskStorage({
    destination: (req:any, file:any, cb:any) => {
        cb(null, 'uploadFotos/'); // Specify the destination folder
    },
    filename: (req:any, file:any, cb:any) => {
        cb(null, file.originalname); // Use original filename
    }
});
const upload = multer({ storage: storage });

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
    public inscribirEstudiante = async(req: Request, res: Response) => {
        try {
            const params: EstudianteInterface = req.body
            const token: any = req.token
            const decodedToken: any = jwt.verify(token, 'UNDAC_ADMISION');
            console.log("decodedToken",decodedToken)
            params.DNI = decodedToken.dni
            console.log("params", params)
            const resp_1 = await this.estudianteService.registrarDatosComplementarios(params)
            const resp_2 = await this.estudianteService.registrarInscripcionEstudiante(params)
            res.status(200).json({resp_1, resp_2})
            
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public subirFotoEstudiante = async(req: any, res: Response) => {
        try {
            upload.single('foto')(req, res, (err:any) => {
                // if (err) {
                //     res.status(500).json(err);
                // } else {
                const params:  any= req.body;
                params.foto = req.file.path;
                res.status(200).json(params)
                // }
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    public routes() {
        this.router.post('/consultar-dni', asyncHandler(this.consultarEstudianteExiste))
        this.router.post('/registrar-estudiante', asyncHandler(this.registrarEstudiante))
        this.router.post('/inscribir-estudiante', asyncHandler(this.inscribirEstudiante))
        this.router.post('/subir-foto-estudiante', upload.single('foto'), asyncHandler(this.subirFotoEstudiante))
        
        
    
    }
}
export default EstudianteController