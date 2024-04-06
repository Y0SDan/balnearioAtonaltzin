import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Models/Cliente';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from 'src/app/services/cliente.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  cliente = new Cliente() ;
  constructor(private clienteService : ClienteService , private router: Router) { 

  }
  logueo()
  {
    this.clienteService.existe1(this.cliente.Email,this.cliente.password1).subscribe((resusuario: any) =>
    {
      console.log(this.cliente.Email)
      console.log(this.cliente.password1)
      console.log(resusuario)
      localStorage.setItem('Email', resusuario.Email);
      localStorage.setItem('ID_Cliente', resusuario.id_cliente);
      localStorage.setItem('Tipo_Usuario', resusuario.tipo_usuario);

      if(resusuario.tipo_usuario == -1)
      {
        console.log("Error, usuario o contrasena no valida");
        localStorage.setItem('Email', resusuario.Email);
        localStorage.setItem('ID_Cliente', resusuario.id_cliente);
        console.log('ID_Cliente:', resusuario.id_cliente)
       // this.router.navigateByUrl('/home/principal');
      }else{
        if (resusuario.tipo_usuario === 'usuario') {
          console.log("tiene que ir a principal");
        localStorage.setItem('ID_Cliente', resusuario.id_cliente);
          console.log('ID_Cliente:', resusuario.id_cliente);
          this.router.navigateByUrl('/principal');
        } else if (resusuario.tipo_usuario === 'administrador') {
          this.router.navigateByUrl('home/admin');
        } else if (resusuario.tipo_usuario === 'seller') {
          this.router.navigateByUrl('home/seller');
        } else {
          console.log('Tipo de usuario desconocido');
          // Aquí puedes redirigir a una página de error o mostrar un mensaje de error
        }
        
      }
    },
    err => console.error(err)
    );
  }
}

