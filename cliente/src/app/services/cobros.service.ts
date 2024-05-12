import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CobrosService {


  constructor(private http: HttpClient) { }
  list()
  {
    return this.http.get(`${environment.API_URL}/cobros/showCobros`);
  } 
    addCobro(cobros:any)
{
    console.log("Entrando al servicio de crear Usuario");
return this.http.post(`${environment.API_URL}/cobros/addCobro`,cobros);
}
showOne(idCobro : any){
  return this.http.get(`${environment.API_URL}/cobros/showOne/${idCobro}`)
}

reporteventas(FechaInicial:any, FechaFinal:any)
{
return this.http.get(`${environment.API_URL}/clientes/actualizarCliente/${FechaInicial},${FechaFinal}`);
}
actualizarCobro(cobro:any)
{
return this.http.put(`${environment.API_URL}/cobros/actualizarCobro/${cobro.IdCobro}`,
cobro);
}
eliminarCobro(idCobro:any)
{
    console.log("Eliminando un cobro");
return this.http.delete(`${environment.API_URL}/cobros/eliminarCobro/${idCobro}`,idCobro);    
}
}
  