import { Request, Response, Router } from "express";
import asyncHandler from 'express-async-handler'
import { InputsControlsService } from '../../services/inputs-controls/inputs-controls.service'

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
    public obtenerFacultades = async(req: Request, res: Response) => {
        try {
            const resp = await this.inputsControlsService.obtenerFacultades()
            res.status(200).json(resp)
        }catch(error) {
            res.status(500).json(error)
        }
    }
    public routes() {
        this.router.get('/obtener-procesos', asyncHandler(this.obtenerProcesos))
        this.router.get('/obtener-carreras', asyncHandler(this.obtenerCarreras))
        this.router.get('/obtener-facultades', asyncHandler(this.obtenerFacultades))
    }
}

export { InputsControlsController }