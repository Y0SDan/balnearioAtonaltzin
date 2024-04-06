import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Reservacion } from '../Models/Reservacion';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }
  list()
  {
    return this.http.get(`${environment.API_URL}/reservas/Mostrar_reservaciones`);
  } 
  addReserva(reserva:any)
  {
  return this.http.post(`${environment.API_URL}/reservas/addReserva`,reserva);
  }
  eliminarReservacion(id:any)
  {
    return this.http.delete(`${environment.API_URL}/reservas/eliminarReservacion/${id}`);
  }
  actualizarReservacion(reservacion:any)
  {
    return this.http.put(`${environment.API_URL}/reservas/actualizarReservacion/${reservacion.ID_Reservacion}`,reservacion);
  }
  listOne(id : any){
    return this.http.get(`${environment.API_URL}/reservas/showOne/${id}`)
  }
  listByUser(id : any){
    return this.http.get(`${environment.API_URL}/reservas/Mostrar_reservaciones_usuario/${id}`)
  }
  ValidarReserva(id : any, FechaInicio: any, FechaFin : any){

    return this.http.get(`${environment.API_URL}/reservas/ValidarReserva/${id}/${FechaInicio}/${FechaFin}`);

  }
}
