import { Component, OnInit } from '@angular/core';
import { ReservacionAdmin } from 'src/app/Models/ReservacionAdmin';
import { ReservaService } from 'src/app/services/reserva.service';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-reservacion-admin',
  templateUrl: './reservacion-admin.component.html',
  styleUrls: ['./reservacion-admin.component.css']
})
export class ReservacionAdminComponent implements OnInit {

  reservaciones : ReservacionAdmin [] = [];
  reservacion : ReservacionAdmin = new ReservacionAdmin();
  reservacionNueva : ReservacionAdmin = new ReservacionAdmin ();
  pageSize = 3;
  p = 1;
  idioma: any = 1;
  constructor(private reservaService : ReservaService, private cambioIdiomaService: CambioIdiomaService) { 
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
    this.reservaService.list().subscribe((resReservas: any) => {
      this.reservaciones = resReservas;
    },err => console.error(err));

    this.recargarReservaciones();

    $(document).ready(function(){
      $('.modal').modal();
    });
  }

  actualizarReservacion(Nombre: any){
    this.reservaService.listOne(Nombre).subscribe((resusuario: any) => {
      // Verifica si las propiedades de fecha son "0000-00-00" y, si es así, las cambia a una cadena vacía
      if (resusuario.FechaInicio === '0000-00-00') {
        resusuario.FechaInicio = '';
      }
      if (resusuario.FechaFin === '0000-00-00') {
        resusuario.FechaFin = '';
      }

      this.reservacion = resusuario; // Asigna el objeto a this.reservacion
      console.log(this.reservacion)
      $(`#modalModificarReservacion`).modal();
      $("#modalModificarReservacion").modal("open");
    }, err => console.error(err));
  }
  guardarActualizarReservacion(){
    if (this.idioma  !=1) {
      this.reservaService.actualizarReservacion(this.reservacion).subscribe((res) => {
        $(`#modalModificarReservacion`).modal('close');
        console.log(this.reservacion); // Imprime los valores de this.reservacion
        this.reservaService.list().subscribe((resReservas: any) => { 
          //this.reservacion = resReservas;
        },err => console.error(err));
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Plan Actualizado'
        })
        this.recargarReservaciones(); // Llama a la función para recargar las reservaciones
      }, err => console.error(err));
    } else {
      this.reservaService.actualizarReservacion(this.reservacion).subscribe((res) => {
        $(`#modalModificarReservacion`).modal('close');
        console.log(this.reservacion); // Imprime los valores de this.reservacion
        this.reservaService.list().subscribe((resReservas: any) => { 
          //this.reservacion = resReservas;
        },err => console.error(err));
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Updated Plan'
        })
        this.recargarReservaciones(); // Llama a la función para recargar las reservaciones
      }, err => console.error(err));
    }
  }
    

  eliminarReservacion(id: number) {
    if (this.idioma  !=1) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, quiero eliminarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          // Aquí va el código para eliminar la reservación
              // Aquí puedes llamar a tu servicio para eliminar la reservación
      this.reservaService.eliminarReservacion(id).subscribe(res => {
        // Aquí puedes manejar la respuesta, por ejemplo, recargar las reservaciones
        Swal.fire({
          title: "¡Eliminado!",
          text: "Tu cobro ha sido eliminado.",
          icon: "success"
        });
        this.recargarReservaciones(); 
        //$('#modal1').modal('open');
      }, error => {
        // Aquí puedes manejar los errores
      });
        }
      })
      
    }else{
      Swal.fire({
        title: 'You are sure?',
        text: "You won't be able to reverse this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes I want to delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          // Aquí va el código para eliminar la reservación
              // Aquí puedes llamar a tu servicio para eliminar la reservación
      this.reservaService.eliminarReservacion(id).subscribe(res => {
        // Aquí puedes manejar la respuesta, por ejemplo, recargar las reservaciones
        Swal.fire({
          title: "¡DELETE!",
          text: "Your charge has been eliminated.",
          icon: "success"
        });
        this.recargarReservaciones(); 
        //$('#modal1').modal('open');
      }, error => {
        // Aquí puedes manejar los errores
      });
        }
      })
      
    }
   
  }

  recargarReservaciones() {
    this.reservaService.list().subscribe((resReservas: any) => {
      this.reservaciones = resReservas;
    },err => console.error(err));
  }
}
