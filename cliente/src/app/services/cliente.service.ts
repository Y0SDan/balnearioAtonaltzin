import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }
  list()
  {
    return this.http.get(`${environment.API_URL}/clientes/showCliente`);
  } 
existe(Email : any, password1 : any){ 
    console.log(Email,password1)
    return this.http.post(`${environment.API_URL}/clientes/login`,{"correo":Email, "contrasena":password1});
}
existe1(email: any, password: any) {
    const data = {
        Email: email,
        password1: password,
      };
      return this.http.post(`${environment.API_URL}/clientes/login`, data);
    }
    
    addCliente(cliente:any){
        console.log("Entrando al servicio de crear Usuario");
    return this.http.post(`${environment.API_URL}/clientes/addCliente`,cliente);
    }
    
    showOne(ID_Cliente : any){
      return this.http.get(`${environment.API_URL}/clientes/showOne/${ID_Cliente}`)
    }
    
    eliminarUsuario(id : any){ 
      return this.http.delete(`${environment.API_URL}/clientes/eliminarCliente/${id}`);
    }
    actualizarCliente(cliente:any)
    {
    return this.http.put(`${environment.API_URL}/clientes/actualizarCliente/${cliente.ID_Cliente}`,
    cliente);
    }

    actualizarContrasena(token:any, nuevaContrasena:any){
      return this.http.put(`${environment.API_URL}/clientes/actualizarContrasena`,{"correo":token,"contrasena":nuevaContrasena});
    }
    
    }
  
