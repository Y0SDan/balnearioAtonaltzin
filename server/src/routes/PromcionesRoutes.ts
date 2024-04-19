import { Router } from 'express';
import { promocionesController } from '../controllers/PromocionController';
class promocionesRoutes
{
public router: Router=Router();
constructor()
{
this.config();
}
config() : void
{

this.router.post('/addPromocion/',promocionesController.addPromocion);
this.router.get('/showPromos/',promocionesController.showPromos);
this.router.get('/showOne/:id',promocionesController.showOne);
this.router.get('/ObtenerDescuento/:id',promocionesController.ObtenerDescuento);
this.router.delete('/eliminarPromocion/:id', promocionesController.eliminarPromocion);
this.router.put('/actualizarPromocion/:id',promocionesController.actualizarPromocion);
}
}
const promocionnRoutes= new promocionesRoutes();
export default promocionnRoutes.router;