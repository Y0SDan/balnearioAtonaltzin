import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CorreoService {
  constructor(private http: HttpClient) { }
  enviarCorreoRecuperarContrasena(body: any) {
    return this.http.post(`${environment.API_URL_CORREOS}/enviarCorreoRecuperarContrasena/`, body);
  }
  decodificarMail(token: any) {
    let dato = { "token": token };
    return this.http.post(`${environment.API_URL_CORREOS}/decodificarMail`, dato);
  }
  verificarCorreo(correo: any) {
    return this.http.get(`${environment.API_URL}/clientes/obtenerClienteCorreo/${correo}`).pipe(
      catchError(error => {
        console.error('Error al verificar el correo :´c :', error);
        return of(null);
      })
    );
  }
}
