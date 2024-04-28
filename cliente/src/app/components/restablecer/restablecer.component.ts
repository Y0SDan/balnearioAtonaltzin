import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ClienteService } from 'src/app/services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { CorreoService } from 'src/app/services/correo.service';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';

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
  idioma: any = 1;
  constructor(private clienteService: ClienteService, private route: ActivatedRoute,
     private correoService:CorreoService, private cambioIdiomaService: CambioIdiomaService) { 
    this.nuevaContrasena = "";
    this.nuevaContrasenaConfirmacion = "";
    this.idioma = 1;
    this.idioma = localStorage.getItem("idioma");
    console.log("idioma", this.idioma)
    if (this.idioma === null || this.idioma === undefined || this.idioma === '') {
      //Si el usuario no cambio el idioma lo dejamos por default en ingles
      localStorage.setItem("idioma", "2");
      this.idioma = "2";
    }

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
    if (this.idioma  !=1){
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
    } else {
      console.log(this.nuevaContrasena);
      console.log(this.nuevaContrasenaConfirmacion);
  
      if (this.nuevaContrasena == "" || this.nuevaContrasenaConfirmacion == ""){
        Swal.fire({
          title: 'Error',
          text: 'Please fill all fields',
          icon: 'error',
          confirmButtonText: 'Accept'
        })
        return;
      }else{
        if (this.nuevaContrasena != this.nuevaContrasenaConfirmacion){
          Swal.fire({
            title: 'Error',
            text: 'Passwords do not match',
            icon: 'error',
            confirmButtonText: 'Accept'
          })
          return;
        }else{
          this.clienteService.actualizarContrasena(this.token, this.nuevaContrasena).subscribe((res : any) => {
            console.log(res);
            Swal.fire({
              title: 'Successful update',
              text: 'Your password has been updated',
              icon: 'success',
              confirmButtonText: 'Accept'
            })
          }, err => console.error(err));
        }
  
  
      }
    }
    
    
  }
}
