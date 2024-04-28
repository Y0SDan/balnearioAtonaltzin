import { Component, OnInit } from '@angular/core';
import { Reservacion } from 'src/app/Models/Reservacion';
import { ReservaService } from './../../services/reserva.service';
import { Cabana1 } from 'src/app/Models/Cabana1';
import { ImagenCabana } from 'src/app/Models/ImagenCabana';
import { CabanaService } from './../../services/cabana.service';
import { ImagenescabanasService } from 'src/app/services/imagenescabanas.service';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
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
  idioma: any = 1;

  idCabana: any;
  cabana: Cabana1 = new Cabana1();
  idioma: any;
  imagenescabana: ImagenCabana[] = [];
  liga = '';

  constructor(private reservaService: ReservaService, private cabanaService: CabanaService, private imagenescabanasService: ImagenescabanasService, private cambioIdiomaService: CambioIdiomaService) {
    this.FechaInicio = ""
    this.FechaFin = ""
    this.DiasReservados = 0;
    this.TotalAPagar = 0;
    this.PrecioPorNoche = 0;
    this.liga = environment.API_URL_IMAGENES;
    this.idioma = localStorage.getItem("idioma");
    this.cambioIdiomaService.currentMsg$.subscribe(
      (msg) => {
        if (msg != '') {
          this.idioma = msg;
        }
      }
    );
    this.idCabana = localStorage.getItem("ID_Cabana");
    this.cabanaService.listOne(this.idCabana).subscribe((rescabana: any) => {
      this.cabana = rescabana;
      this.nuevaReserva.ID_Cabana = this.cabana.ID_Cabana;
      this.nuevaReserva.PrecioPorNoche = this.cabana.PrecioPorNoche;
    }, err => console.error(err));
    this.imagenescabanasService.mostrarImagenesPorCabana(this.idCabana).subscribe((res: any) => {
      this.imagenescabana = res;
      console.log("imagenes: ", this.imagenescabana)
    }, err => console.error(err));
  }

  ngOnInit(): void {
    {
      this.initDatepickerIni();
      this.initDatepickerFin();
    }
    $(document).ready(function () {
      $('.materialboxed').materialbox();
    });
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

  initDatepickerIni() {
    $("#fechaIni").datepicker({
      format: 'yyyy-mm-dd',
      defaultDate: this.FechaInicio
    })
  }
  initDatepickerFin() {
    $("#fechaFin").datepicker({
      format: 'yyyy-mm-dd',
      defaultDate: this.FechaFin
    })
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

<<<<<<< HEAD
  guardarNuevaReserva() {
    this.nuevaReserva.FechaInicio = this.FechaInicio;
    this.nuevaReserva.FechaFin = this.FechaFin;

    this.reservaService.ValidarReserva(this.nuevaReserva.ID_Cabana, this.nuevaReserva.FechaInicio, this.nuevaReserva.FechaFin)
      .subscribe((res: any) => {
        console.log(res.resultado);
        console.log("ID_CABANA: ", this.nuevaReserva.ID_Cabana, "Fecha inicio: ", this.nuevaReserva.FechaInicio, "Fecha Fin: ", this.nuevaReserva.FechaFin)
        if (res.resultado === 1) {
=======
guardarNuevaReserva() {
  this.nuevaReserva.FechaInicio = this.FechaInicio;
  this.nuevaReserva.FechaFin = this.FechaFin;
  if (this.idioma  !=1) {
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
      } else if (res.error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: res.message
        });
      } else {
        if (new Date(this.nuevaReserva.FechaInicio) >= new Date(this.nuevaReserva.FechaFin) || new Date(this.nuevaReserva.FechaInicio).getTime() === new Date(this.nuevaReserva.FechaFin).getTime()) {
          // Las fechas no son válidas, muestra un mensaje de error
>>>>>>> a09e1e37b7340a0fc8f9eee49853cff918a2eb7d
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
<<<<<<< HEAD
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
=======
          }, err => console.error(err));
      }
  }, err => console.error(err));   // Llamar a mostrarPrecioReserva para obtener el precio total

} else {
  this.reservaService.ValidarReserva(this.nuevaReserva.ID_Cabana, this.nuevaReserva.FechaInicio, this.nuevaReserva.FechaFin)
    .subscribe((res: any) => {
      console.log(res.resultado);
      console.log("ID_CABANA: ", this.nuevaReserva.ID_Cabana, "Fecha inicio: ", this.nuevaReserva.FechaInicio, "Fecha Fin: ", this.nuevaReserva.FechaFin)
      if (res.resultado === 1) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          text: "The cabin is not available in the selected date range"
        });
      } else {
        if (new Date(this.nuevaReserva.FechaInicio) >= new Date(this.nuevaReserva.FechaFin) || new Date(this.nuevaReserva.FechaInicio).getTime() === new Date(this.nuevaReserva.FechaFin).getTime()) {
          // Las fechas no son válidas, muestra un mensaje de error
          Swal.fire({
            position: 'center',
            icon: 'error',
            text: "Reservation dates are not valid"
          });
          return;
        }
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
            text: "Reservation completed"
          });
        }, err => console.error(err));
      }
    }, err => console.error(err));
}

}
>>>>>>> a09e1e37b7340a0fc8f9eee49853cff918a2eb7d


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
