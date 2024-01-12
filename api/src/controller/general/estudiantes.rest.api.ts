import { Request, Response, Router } from 'express'
import asyncHandler from 'express-async-handler'
import { EstudiantesGeneralService } from '../../services/general/estudiantes/EstudianteGeneral.service'
import { EstudianteInterface } from '../../interfaces/administrador/estudiantes.interface'
import multer from 'multer'
import jwt from 'jsonwebtoken'
import fs from 'fs'



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const nombreSinExtension = file.originalname.split('.')[0];
        const directorioDestino = `./uploads/${nombreSinExtension}`;

        // Verificar si el directorio existe, y si no, crearlo
        if (!fs.existsSync(directorioDestino)) {
        fs.mkdirSync(directorioDestino, { recursive: true });
        }
        cb(null, `./uploads/${nombreSinExtension}`);
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    },
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
            params.DNI = decodedToken.dni
            // console.log("decodedToken",decodedToken)
            // console.log("params", params)
            const resp_1: any = await this.estudianteService.registrarDatosComplementarios(params)
            const resp_2: any = await this.estudianteService.registrarInscripcionEstudiante(params)
            if(!resp_1.ok && !resp_2.ok) {
                res.status(200).json({ok: false, message: 'No se llego a registrar'})
                return
            }
            if (!resp_1.ok || !resp_2.ok) {
                res.status(200).json({ok: false, message: 'Se completo solo uno de los registros'})
                return
            }
            res.status(200).json({ok: true, message: 'Se guardo los cambios correctamente' })
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public subirFotoEstudiante = async(req: any, res: Response) => {
        try {
            if (!req.file) { 
                res.status(400).json({ error: 'No se proporcionó ningún archivo.' });
              }
              res.status(200).json({ok: true, message: 'Foto subido correctamente'})
            
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public subirDocumentacionEstudiante = async(req: any, res: Response) => {
        try {
            if(!req.file) {
                res.status(400).json({ error: 'No se proporcionó ningún archivo.' });
            }
            res.status(200).json({ok: true, message: 'Documento subido correctamente'})
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public registrarTestPsicologico = async(req: Request, res:Response) => {
        try {
            const params: any = req.body
            const resp = await this.estudianteService.registrarTestPsicologicoEstudiante(params);
            res.status(200).json(resp)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public verificarTestpsicologicoInscrito = async(req: Request, res: Response) => {
        try {
            const params: any = req.body
            const resp = await this.estudianteService.verificarTestpsicologicoInscrito(params);
            res.status(200).json(resp)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public verificarInscripcionEstudiante = async(req: Request, res: Response) => {
        try {
            const params: any = req.body
            const resp = await this.estudianteService.verificarInscripcionEstudiante(params);
            res.status(200).json(resp)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public verificarDatosCompletamerioEstudiante = async(req: Request, res: Response) => {
        try {
            const params: any = req.body
            const resp = await this.estudianteService.verificarDatosCompletamerioEstudiante(params);
            res.status(200).json(resp)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public routes() {
        this.router.post('/consultar-dni', asyncHandler(this.consultarEstudianteExiste))
        this.router.post('/registrar-estudiante', asyncHandler(this.registrarEstudiante))
        
        this.router.post('/inscribir-estudiante', asyncHandler(this.inscribirEstudiante))
        this.router.post('/subir-foto-estudiante', upload.single('foto'), asyncHandler(this.subirFotoEstudiante))
        this.router.post('/subir-documentos-estudiante', upload.single('documento'), asyncHandler(this.subirDocumentacionEstudiante))
        this.router.post('/registrar-test-psicologico', asyncHandler(this.registrarTestPsicologico))
        this.router.post('/verificar-test-psicologico-inscrito', asyncHandler(this.verificarTestpsicologicoInscrito))
        this.router.post('/verificar-inscripcion-estudiante', asyncHandler(this.verificarInscripcionEstudiante))
        this.router.post('/verificar-registro-complementario-estudiante', asyncHandler(this.verificarDatosCompletamerioEstudiante))
        
    }
}
export default EstudianteController