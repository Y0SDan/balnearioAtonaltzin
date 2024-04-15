import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagenescabanasService {

  constructor(private http: HttpClient) { }

  crearImagenCabana(imagencabana : any) {
    return this.http.post(`${environment.API_URL}/imagenescabanas/crearImagenCabana`, imagencabana);
  }
  mostrarImagenesPorCabana(id : any) {
    return this.http.get(`${environment.API_URL}/imagenescabanas/MostrarImagenesPorCabana/${id}`)
  }
  eliminarImagenCabana(id: any) {
    return this.http.delete(`${environment.API_URL}/imagenescabanas/eliminarImagenCabana/${id}`);
  }
}
