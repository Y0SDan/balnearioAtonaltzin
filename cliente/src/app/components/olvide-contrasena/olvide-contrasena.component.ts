import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CorreoService } from 'src/app/services/correo.service';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';

@Component({
  selector: 'app-olvide-contrasena',
  templateUrl: './olvide-contrasena.component.html',
  styleUrls: ['./olvide-contrasena.component.css']
})
export class OlvideContrasenaComponent implements OnInit {

  correo: string = "";
  idioma: any = 1;


  constructor(private correosService: CorreoService, private cambioIdiomaService: CambioIdiomaService) {
    this.correo = "";
    this.idioma = 1;
    //this.getLanguage(this.idioma);
    this.idioma = localStorage.getItem("idioma");
    console.log("idioma", this.idioma)
    if (this.idioma === null || this.idioma === undefined || this.idioma === '') {
      //Si el usuario no cambio el idioma lo dejamos por default en ingles
      localStorage.setItem("idioma","2"); 
      this.idioma= "2";
    }
  }

  ngOnInit(): void {
    console.log(this.idioma);
    this.cambioIdiomaService.currentMsg$.subscribe(
      (msg) => {
        this.idioma = msg;
        console.log("idioma actual cabanas:", this.idioma, " aaaa");
      }
    );
  }
  enviarCorreo() {
    if (this.idioma  != 1) {
      console.log('idioma:', this.idioma);
      this.correosService.verificarCorreo(this.correo).subscribe((res: any) => {
        console.log('verificando correo',res);
        if (res && res.length > 0) {
          console.log('Hola');
          console.log('Email:', this.correo)
          console.log('verificando correo',res);
          this.correosService.enviarCorreoRecuperarContrasena({ Email: this.correo }).subscribe((res: any) => {
            console.log('Correo enviado:', res);
            Swal.fire({
              title: 'Correo enviado',
              text: 'Se ha enviado un correo a su dirección de correo electrónico',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          }, error => {
            console.error('Error al enviar el correo:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al enviar el correo electrónico',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          });
        } else {
          Swal.fire({
            title: 'Correo no encontrado',
            text: 'No te encuentras registrado en el sistema o el correo que proporcionaste es incorrecto',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      }, error => {
        console.error('Error al verificar el correo:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al verificar el correo',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
      
    } else{
      this.correosService.verificarCorreo(this.correo).subscribe((res: any) => {
      
        if (res && res.length > 0) {
          this.correosService.enviarCorreoRecuperarContrasena({ Email: this.correo }).subscribe((res: any) => {
            //console.log('Correo enviado:', res);
            Swal.fire({
              title: 'Email sent',
              text: 'An email has been sent to your email address',
              icon: 'success',
              confirmButtonText: 'Accept'
            });
          }, error => {
            console.error('Error al enviar el correo:', error);
            Swal.fire({
              title: 'Error',
              text: 'There was a problem sending the email',
              icon: 'error',
              confirmButtonText: 'Accept'
            });
          });
        } else {
          Swal.fire({
            title: 'Email not found',
            text: 'You are not registered in the system or the email you provided is incorrect',
            icon: 'error',
            confirmButtonText: 'Accept'
          });
        }
      }, error => {
        console.error('Error al verificar el correo:', error);
        Swal.fire({
          title: 'Error',
          text: 'There was a problem verifying the email',
          icon: 'error',
          confirmButtonText: 'Accept'
        });
      });
      
    }
    }
    
}
