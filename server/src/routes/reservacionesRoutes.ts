import { Router } from 'express';
import { reservacionesController } from '../controllers/ReservacionesController';
class reservacionesRoutes
{
public router: Router=Router();
constructor()
{
this.config();
}
config() : void
{

//this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));

this.router.get('/ValidarReserva/:ID_Cabana/:FechaInicio/:FechaFin',reservacionesController.ValidarReserva);
this.router.post('/addReserva/',reservacionesController.addReserva);
this.router.get('/Mostrar_reservaciones/',reservacionesController.showReservas);
this.router.get('/Mostrar_reservaciones_usuario/:id',reservacionesController.mostrarReservasXUsuario);
this.router.get('/showOne/:id',reservacionesController.showOne);
this.router.delete('/eliminarReservacion/:id', reservacionesController.eliminarReservacion);
this.router.put('/actualizarReservacion/:id',reservacionesController.actualizarReservacion);
this.router.get('/PrecioReserva/:id/:FechaInicio/:FechaFin',reservacionesController.PrecioReserva);
this.router.get('/mostrarPrecioReserva/:id',reservacionesController.mostrarPrecioReserva);
}
}
const reservacionRoutes= new reservacionesRoutes();
export default reservacionRoutes.router;