import { Router } from 'express';
import { imagenesCabanasController } from '../controllers/ImagenesCabanasController';
class ImagenesCabanasRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.post('/crearImagenCabana/', imagenesCabanasController.addImage);
        this.router.get('/MostrarImagenesPorCabana/:id', imagenesCabanasController.mostrarImagenesPorCabana);
        this.router.delete('/eliminarImagenCabana/:id', imagenesCabanasController.deleteImage);
    }
}
const imagenesCabanasRoutes = new ImagenesCabanasRoutes();
export default imagenesCabanasRoutes.router;