import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CabanaService {


    constructor(private http: HttpClient) { }
    list()
    {
      return this.http.get(`${environment.API_URL}/cabanas/MostrarTodasCabanas`);
    } 
    crearcabana(cabana:any)
  {
      console.log("Entrando al servicio de crear Usuario");
  return this.http.post(`${environment.API_URL}/cabanas/crearcabana`,cabana);
  }
  listOne(id : any){
    return this.http.get(`${environment.API_URL}/cabanas/listOne/${id}`)
  }
  
  actualizarCabana(cabana:any)
{
return this.http.put(`${environment.API_URL}/cabanas/actualizarCabana/${cabana.ID_Cabana}`,
cabana);
}
eliminarCabana(id : any){ 
  return this.http.delete(`${environment.API_URL}/cabanas/eliminarCabana/${id}`);
}
  
  }
  