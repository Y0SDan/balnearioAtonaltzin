import { Component, OnInit } from '@angular/core';
import { Reservacion } from 'src/app/Models/Reservacion';
import { ReservaService } from './../../services/reserva.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  reservas :  [] = [];
  reserva: Reservacion = new Reservacion();
  nuevaReserva: Reservacion = new Reservacion();
FechaInicio:string;
FechaFin:string;

  constructor(private reservaService: ReservaService) {
    this.FechaInicio=""
this.FechaFin=""
   }

  ngOnInit(): void {
    {
      this.initDatepickerIni();
      this.initDatepickerFin();
      }
      $(document).ready(function(){
        $('.materialboxed').materialbox();
      });
          
}
initDatepickerIni()
{
$("#fechaIni").datepicker({
format: 'yyyy-mm-dd',
defaultDate: this.FechaInicio
})
}
initDatepickerFin()
{
$("#fechaFin").datepicker({
format: 'yyyy-mm-dd',
defaultDate: this.FechaFin
})
}
actualizarFechaIni(date?: any)
{
if(date){
this.FechaInicio = date;
}
console.log(this.FechaInicio);
}
actualizarFechaFin(date?: any)
{
if(date){
this.FechaFin = date;
}
}
  addReserva() {
    this.nuevaReserva = new Reservacion();
    this.nuevaReserva.ID_Cliente = parseInt(localStorage.getItem('ID_Cliente') ?? '-1'); // Usar parseInt para convertir el string en número, o proporcionar un valor predeterminado si es null
    console.log("Cliente Nuevo")
    $('#modalCrearReservacion').modal();
    $("#modalCrearReservacion").modal("open");
}

guardarNuevaReserva(){
  this.nuevaReserva.FechaInicio = this.FechaInicio;
  this.nuevaReserva.FechaFin = this.FechaFin;
  
  // Aquí se llama al servicio que verifica la disponibilidad
  this.reservaService.ValidarReserva(this.nuevaReserva.ID_Cabana, this.nuevaReserva.FechaInicio, this.nuevaReserva.FechaFin)
    .subscribe((res: any) => {
      console.log(res.resultado);
      console.log("ID_CABANA: ",this.nuevaReserva.ID_Cabana, "Fecha inicio: ",this.nuevaReserva.FechaInicio, "Fecha Fin: ",this.nuevaReserva.FechaFin)
      if (res.resultado === 1) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: 'La cabaña no está disponible en el rango de fechas seleccionado'
        });
      } else {
        // Si la cabaña está disponible, se agrega la reserva
        this.reservaService.addReserva(this.nuevaReserva).subscribe((res) => {
          $('#modalCrearReservacion').modal('close');
          this.reservaService.list().subscribe(
            (resusuarios: any) => {
              this.reserva = resusuarios;
              console.log(resusuarios);
            },
            (err: any) => {
              console.error(err);
              this.showAlert('Something went wrong!', 'error');
            }
          );
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Reserva realizada'
          });
        }, err => console.error(err));
      }
  },err => console.error(err));
}

updateFechaInicio(event: any) {
  this.nuevaReserva.FechaInicio = event.target.value;
}

updateFechaFinal(event: any) {
  this.nuevaReserva.FechaFin = event.target.value;
}
showAlert(message: string, type: 'success' | 'error' | 'warning' = 'success') {
  // Define el estilo del mensaje de alerta
  const alertStyle = {
    success: {
      backgroundColor: '#4CAF50', // Verde para éxito
      color: '#FFF',
    },
    error: {
      backgroundColor: '#f44336', // Rojo para error
      color: '#FFF',
    },
    warning: {
      backgroundColor: '#ff9800', // Naranja para advertencia
      color: '#FFF',
    },
  };
}
submitForm() {
  // Ejecuta la función para guardar el nuevo usuario
  this.guardarNuevaReserva();

  // Redirige a la página principal
  window.location.href = '/principal';
}
}
