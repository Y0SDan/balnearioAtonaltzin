import { Component, OnInit } from '@angular/core';
import { ReservacionAdmin } from 'src/app/Models/ReservacionAdmin';
import { ReservaService } from 'src/app/services/reserva.service';
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

  constructor(private reservaService : ReservaService) { }

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
  }

  eliminarReservacion(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí va el código para eliminar la reservación
            // Aquí puedes llamar a tu servicio para eliminar la reservación
    this.reservaService.eliminarReservacion(id).subscribe(res => {
      // Aquí puedes manejar la respuesta, por ejemplo, recargar las reservaciones
      $('#modal1').modal('open');
    }, error => {
      // Aquí puedes manejar los errores
    });
      }
    })
  }

  recargarReservaciones() {
    this.reservaService.list().subscribe((resReservas: any) => {
      this.reservaciones = resReservas;
    },err => console.error(err));
  }
}
