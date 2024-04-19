import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  existe(email: any, password: any) {
    console.log("porque?");
    console.log(password);
    console.log(password);
    return this.http.post(`${environment.API_URL }/clientes/login`,{"Email": email, "constrasena": password });
  }
}
