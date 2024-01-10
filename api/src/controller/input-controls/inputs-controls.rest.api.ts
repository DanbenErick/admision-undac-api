    import { Request, Response, Router } from "express";
    import asyncHandler from 'express-async-handler'
    import { InputsControlsService } from '../../services/inputs-controls/inputs-controls.service'
    import jwt from 'jsonwebtoken'
    
    class InputsControlsController {
        public router: Router
        public inputsControlsService: InputsControlsService
        public constructor() {
            this.inputsControlsService = new InputsControlsService()
            this.router = Router()
            this.routes()
        }
        public obtenerProcesos = async (req: Request, res: Response) => {
            try {
                const result = await this.inputsControlsService.obtenerProcesos("")
                res.status(200).json(result)
            }catch(error) {
                res.status(500).json(error)
            }
        }
        public obtenerCarreras = async(req: Request, res:Response) => {
            try {
                const result = await this.inputsControlsService.obtenerCarreras("")
                res.status(200).json(result)
            }catch(error) {
                res.status(500).json(error)
            }
        }
        public obtenerCarrerasCodigo = async(req: Request, res:Response) => {
            try {
                const result = await this.inputsControlsService.obtenerCarrerasPorCodigo("")
                res.status(200).json(result)
            }catch(error) {
                res.status(500).json(error)
            }
        }
        public obtenerFacultades = async(req: Request, res: Response) => {
            try {
                const resp = await this.inputsControlsService.obtenerFacultades()
                res.status(200).json(resp)
            }catch(error) {
                res.status(500).json(error)
            }
        }
        public obtenerDiscapacidades = async(req: Request, res: Response) => {
            try {
                const resp = await this.inputsControlsService.obtenerDicapacidades()
                res.status(200).json(resp)
            }catch(error) {
                res.status(500).json(error)
            }
        }
        public obtenerRazasEtnicas = async(req: any, res: Response) => {
            try {
                const token = req.token
                // Decodificar el token
                const decodedToken = jwt.verify(token, 'UNDAC_ADMISION'); // Reemplaza 'tu_clave_secreta' con tu clave secreta real

                // El objeto 'decodedToken' contiene la información decodificada
                console.log('Decoded Token:', decodedToken);
                console.log("TOKEN", token)
                const resp = await this.inputsControlsService.obtenerRazasEtnicas()
                res.status(200).json(resp)
            }catch(error) {
                res.status(500).json(error)
            }
        }
        public obtenerProcesoActivo = async(req: Request, res: Response) => {
            try {
                const resp = await this.inputsControlsService.obtenerProcesoActivo()
                res.status(200).json(resp)
            }catch(error) {
                res.status(500).json(error)
            }
        }
        public obtenerUbicaciones = async(req: Request, res: Response) => {
            try {
                const resp = await this.inputsControlsService.obtenerUbicacionesAutocomplete()
                res.status(200).json(resp)
            }catch(error) {
                res.status(500).json({error: error})
            }
        }
        public obtenerDepartamentos = async(req: Request, res: Response) => {
            try {
                const resp = await this.inputsControlsService.obtenerDepartamentos()
                res.status(200).json(resp)
            }catch(error) {
                res.status(500).json({error: error})
            }
        }
        public obtenerProvincias = async(req: Request, res: Response) => {
            try {
                const params = req.query
                const resp = await this.inputsControlsService.obtenerProvincias(params)
                res.status(200).json(resp)
            }catch(error) {
                res.status(500).json({error: error})
            }
        }
        public obtenerDistritos = async(req: Request, res: Response) => {
            try {
                const params = req.query
                const resp = await this.inputsControlsService.obtenerDistritos(params)
                res.status(200).json(resp)
            }catch(error) {
                res.status(500).json({error: error})
            }
        }
        public routes() {
            this.router.get('/obtener-procesos', asyncHandler(this.obtenerProcesos))
            this.router.get('/obtener-carreras', asyncHandler(this.obtenerCarreras))
            this.router.get('/obtener-carreras-codigo', asyncHandler(this.obtenerCarrerasCodigo))
            this.router.get('/obtener-facultades', asyncHandler(this.obtenerFacultades))
            this.router.get('/obtener-discapacidades', asyncHandler(this.obtenerDiscapacidades))
            this.router.get('/obtener-razas-etnicas', asyncHandler(this.obtenerRazasEtnicas))
            this.router.get('/obtener-proceso-activo', asyncHandler(this.obtenerProcesoActivo))
            this.router.get('/obtener-ubicaciones', asyncHandler(this.obtenerUbicaciones))
            this.router.get('/obtener-departamentos', asyncHandler(this.obtenerDepartamentos))
            this.router.get('/obtener-provincias', asyncHandler(this.obtenerProvincias))
            this.router.get('/obtener-distritos', asyncHandler(this.obtenerDistritos))
            
        }
    }

    export { InputsControlsController }