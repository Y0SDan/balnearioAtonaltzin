import { Component, OnInit } from '@angular/core';
import { Reservacion } from 'src/app/Models/Reservacion';
import { ReservaService } from './../../services/reserva.service';
import Swal from 'sweetalert2';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
declare var $: any;

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  reservas: [] = [];
  reserva: Reservacion = new Reservacion();
  nuevaReserva: Reservacion = new Reservacion();
  FechaInicio: string;
  FechaFin: string;
  DiasReservados: number;
  TotalAPagar: number;
  PrecioPorNoche: number;
  idioma :any;

  constructor(private reservaService: ReservaService,private cambioIdiomaService: CambioIdiomaService) {
    this.FechaInicio = ""
    this.FechaFin = ""
    this.DiasReservados = 0;
    this.TotalAPagar = 0;
    this.PrecioPorNoche = 0;
    this.idioma= localStorage.getItem("idioma");
    this.cambioIdiomaService.currentMsg$.subscribe(
        (msg) => {
          console.log("idioma actual:", this.idioma, " aaaa");
          if(msg != ''){
            this.idioma = msg;
          }
            if(this.idioma=="1"){
              console.log("Ingles");
              this.calendarioEn();
            }else{
              console.log("Español");
              this.calendarioEs();
            }
        });

  }

  ngOnInit(): void {
    this.idioma = localStorage.getItem("idioma");
    $(document).ready(function () {
      $('.materialboxed').materialbox();
    });

  }
  calendarioEn(){
    $("#fechaIni").datepicker({
      format: 'yyyy-mm-dd',
      defaultDate: this.FechaInicio
    })
    ///////////////
    $("#fechaFin").datepicker({
      format: 'yyyy-mm-dd',
      defaultDate: this.FechaFin
    })
    
  }
  calendarioEs(){
    console.log("holaaaaaaa");
    
    $("#fechaIni").datepicker({
      format: 'yyyy-mm-dd',
      i18n: {
        months: [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        monthsShort: [
            'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
            'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ],
        weekdays: [
            'Domingo', 'Lunes', 'Martes', 'Miércoles',
            'Jueves', 'Viernes', 'Sábado'
        ],
        weekdaysShort: [
            'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'
        ],
        weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
    },
      defaultDate: this.FechaInicio
    })
    //////////
    $("#fechaFin").datepicker({
      format: 'yyyy-mm-dd',
      i18n: {
        months: [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        monthsShort: [
            'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
            'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ],
        weekdays: [
            'Domingo', 'Lunes', 'Martes', 'Miércoles',
            'Jueves', 'Viernes', 'Sábado'
        ],
        weekdaysShort: [
            'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'
        ],
        weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
    },
      defaultDate: this.FechaFin
    })
  }
  calcularPrecioTotal() {
    const fechaInicio = new Date(this.FechaInicio);
    const fechaFin = new Date(this.FechaFin);
    const diasReservados = Math.ceil((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 3600 * 24));
    this.nuevaReserva.DiasReservados = diasReservados;
    console.log("Dias reservados:", this.nuevaReserva.DiasReservados);

    this.reservaService.mostrarPrecioReserva(this.nuevaReserva.ID_Cabana)
      .subscribe((res: any) => {
        this.nuevaReserva.PrecioPorNoche = res.PrecioPorNoche; // Suponiendo que la respuesta del backend tiene una propiedad precioPorNoche
        console.log("precio por noche:", res);

        this.nuevaReserva.TotalAPagar = diasReservados * this.nuevaReserva.PrecioPorNoche;
      }, err => {
        console.error(err);
        // Manejo del error, por ejemplo, mostrar un mensaje de error
      });
  }
  actualizarFechaIni(date?: any) {
    if (date) {
      this.FechaInicio = date;
    }
    console.log(this.FechaInicio);
  }
  actualizarFechaFin(date?: any) {
    if (date) {
      this.FechaFin = date;
      this.calcularPrecioTotal();
    }
  }
  addReserva() {
    this.nuevaReserva = new Reservacion();
    this.nuevaReserva.ID_Cliente = parseInt(localStorage.getItem('ID_Cliente') ?? '-1'); // Usar parseInt para convertir el string en número, o proporcionar un valor predeterminado si es null
    console.log("Cliente Nuevo")
    $('#modalCrearReservacion').modal();
    $("#modalCrearReservacion").modal("open");
  }

  guardarNuevaReserva() {
    this.nuevaReserva.FechaInicio = this.FechaInicio;
    this.nuevaReserva.FechaFin = this.FechaFin;

    this.reservaService.ValidarReserva(this.nuevaReserva.ID_Cabana, this.nuevaReserva.FechaInicio, this.nuevaReserva.FechaFin)
      .subscribe((res: any) => {
        console.log(res.resultado);
        console.log("ID_CABANA: ", this.nuevaReserva.ID_Cabana, "Fecha inicio: ", this.nuevaReserva.FechaInicio, "Fecha Fin: ", this.nuevaReserva.FechaFin)
        if (res.resultado === 1) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            text: 'La cabaña no está disponible en el rango de fechas seleccionado'
          });
        } else if (res.error) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            text: res.message
          });
        } else {
          if (new Date(this.nuevaReserva.FechaInicio) >= new Date(this.nuevaReserva.FechaFin) || new Date(this.nuevaReserva.FechaInicio).getTime() === new Date(this.nuevaReserva.FechaFin).getTime()) {
            // Las fechas no son válidas, muestra un mensaje de error
            Swal.fire({
              position: 'center',
              icon: 'error',
              text: 'Las fechas de la reserva no son válidas'
            });
            return;
          }
          this.reservaService.addReserva(this.nuevaReserva)
            .subscribe(() => {
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
      }, err => console.error(err));   // Llamar a mostrarPrecioReserva para obtener el precio total
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
