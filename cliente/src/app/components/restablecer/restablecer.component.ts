import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ClienteService } from 'src/app/services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { CorreoService } from 'src/app/services/correo.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.css']
})
export class RestablecerComponent implements OnInit {
  token : string = "";
  nuevaContrasena : string = "";
  nuevaContrasenaConfirmacion : string = "";
  usuario : any

  constructor(private clienteService: ClienteService, private route: ActivatedRoute, private correoService:CorreoService) { 
    this.nuevaContrasena = "";
    this.nuevaContrasenaConfirmacion = "";


  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
      console.log(this.token); 

      this.correoService.decodificarMail(this.token).subscribe((resUsuario:any)=>
      {
        this.usuario = resUsuario
      })
  
    });
  }

  actualizarContrasena(){
    console.log(this.nuevaContrasena);
    console.log(this.nuevaContrasenaConfirmacion);

    if (this.nuevaContrasena == "" || this.nuevaContrasenaConfirmacion == ""){
      Swal.fire({
        title: 'Error',
        text: 'Por favor llene todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      return;
    }else{
      if (this.nuevaContrasena != this.nuevaContrasenaConfirmacion){
        Swal.fire({
          title: 'Error',
          text: 'Las contraseñas no coinciden',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
        return;
      }else{
        this.clienteService.actualizarContrasena(this.token, this.nuevaContrasena).subscribe((res : any) => {
          console.log(res);
          Swal.fire({
            title: 'Actualización exitosa',
            text: 'Se ha actualizado su contraseña',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
        }, err => console.error(err));
      }


    }
    
  }
}
