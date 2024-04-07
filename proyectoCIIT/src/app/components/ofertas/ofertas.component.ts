import { Component, OnInit } from '@angular/core';
import { Ofertas } from 'src/app/Models/Ofertas';
import { Cabana1 } from 'src/app/Models/Cabana1';
import { OfertaService } from './../../services/oferta.service';
import { CabanaService } from './../../services/cabana.service';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
declare var $: any;
const fechaActual: Date = new Date();

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {
  ofertas: Ofertas[] = [];
  cabanas: Cabana1[] = [];
  oferta: Ofertas = new Ofertas();
  ofertaNuevo: Ofertas = new Ofertas();
  pageSize = 5;
  p = 1;


  constructor(private ofertaService: OfertaService, 
    private cabanaService: CabanaService,
    private cdr: ChangeDetectorRef) { 
    }

  ngOnInit(): void {
    this.recargarOfertas()
    console.log("Fecha actual:", fechaActual);
    $(document).ready(function(){
      $('.modal').modal();
    });
    $(document).ready(function(){
      $('select').formSelect();
    });
  }
  AgregarOferta() {
    this.ofertaNuevo = new Ofertas();
    console.log("Oferta Nueva");
    $('#modalCrearOfertas').modal();
    $("#modalCrearOfertas").modal("open");
  }
  EditarOferta(IdOferta: number) {
    this.ofertaService.showOne(IdOferta).subscribe((resusuario: any) => {
      this.oferta = resusuario;
      console.log(this.oferta)
      $('#modalModificarOfertas').modal();
      $("#modalModificarOfertas").modal("open");
    }, err => console.error(err));
  }
  recargarOfertas() {
    this.ofertaService.list().subscribe((resOfertas: any) => {
      this.ofertas = resOfertas;
      console.log(this.ofertas);
      
    },err => console.error(err));
    this.cabanaService.list().subscribe((res: any) => {
      this.cabanas = res;
      console.log(this.cabanas);
      
    },err => console.error(err));
  }
  funcion(){
    console.log("prueba para las funciones");
  }
  CrearOferta(){
    console.log(this.ofertaNuevo);
    let Fecha_reserva:Date = new Date(this.ofertaNuevo.Fecha_inicio);
    if(this.ofertaNuevo.Fecha_inicio == " " || this.ofertaNuevo.Fecha_fin == " "){
      Swal.fire({
        title: "Error!",
        text: "Error en las Fechas estan vacias",
        icon: "warning"
      });
    }else if(this.ofertaNuevo.Fecha_inicio < fechaActual.toString()){
      Swal.fire({
        title: "Error!",
        text: "No se puede elegir una fecha anterior a la fecha actual",
        icon: "warning"
      });
    }else if(this.ofertaNuevo.Fecha_inicio > this.ofertaNuevo.Fecha_fin){
      Swal.fire({
        title: "Error!",
        text: "Error en las Fechas",
        icon: "warning"
      });
    }else if(this.ofertaNuevo.Fecha_inicio == this.ofertaNuevo.Fecha_fin){
      Swal.fire({
        title: "Error!",
        text: "Las Fechas no pueden ser las mismas",
        icon: "warning"
      });
    }else{
      this.ofertaService.AgregarOferta(this.ofertaNuevo).subscribe(
        (res) => {
          $('#modalCrearCliente').modal('close');
          this.ofertaService.list().subscribe(
            (resusuario: any) => {
              this.ofertas = resusuario;
            },
            err => console.error(err)
          );
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Se creo con exito'
          });
        },
        err => {
          console.error(err);
          Swal.fire({
            title: "Error!",
            text: "Ocurrio un error",
            icon: "error"
          });
        }
      );
    }
    
  }
  EliminarOferta(id: any) {
    console.log("Click en eliminar oferta");
    console.log("Identificador del oferta: ", id);
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No es posible revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, quiero eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.ofertaService.eliminarOferta(id).subscribe(
          (resusuario: any) => {
            console.log("resusuario: ", resusuario);
            this.ofertaService.list().subscribe(
              (resusuario: any) => {
                this.ofertas = resusuario;
                console.log(this.ofertas);
              },
              err => console.error(err)
            );
          },
          err => console.error(err)
        );

        Swal.fire({
          title: "Eliminado!",
          text: "Tu oferta ha sido eliminada.",
          icon: "success"
        });
      }
    });
  }
  ActualizarOferta() {
    this.ofertaService.actualizarOferta(this.oferta).subscribe(() => {
      console.log(this.oferta.id_promocion);
      $('#modalModificarOfertas').modal('close');
      Swal.fire({
        title: "Oferta Actualizada!",
        text: "Tu oferta ha sido actualizada.",
        icon: "success"
      });
      this.cdr.detectChanges();
      this.ofertaService.list().subscribe((resusuario: any) => {
        this.ofertas = resusuario;
    })
    }, err => {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Ocurrio un error",
        icon: "error"
      });
    });
  }
}
