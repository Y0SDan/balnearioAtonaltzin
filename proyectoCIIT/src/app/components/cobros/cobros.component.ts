import { Component, OnInit } from '@angular/core';
import { Cobros } from 'src/app/Models/Cobros';
import { CobrosService } from './../../services/cobros.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-cobros',
  templateUrl: './cobros.component.html',
  styleUrls: ['./cobros.component.css']
})
export class CobrosComponent implements OnInit {

    cobros :  Cobros[] = [];
    cobro: Cobros = new Cobros();
    nuevoCobro: Cobros = new Cobros();
  FechaInicio:string;
  FechaFin:string;
  Fecha_Cobro: string;
  pageSize = 3;
  p = 1;
  
    constructor(private cobroService: CobrosService) {
      this.FechaInicio=""
  this.FechaFin=""
  this.Fecha_Cobro=""
    }
  
    ngOnInit(): void {
      {
        this.cobroService.list().subscribe(
          (resusuario: any) => {
            this.cobros = resusuario;
          },
          err => console.error(err)
        );
        this.initDatepickerIni();
        this.initDatepickerFin();
        }
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
    addCobro() {
      this.nuevoCobro = new Cobros();
      console.log("Nuevo cobro")
      $('#modalCrearCobro').modal();
      $("#modalCrearCobro").modal("open");
  }
  actualizarCobro(idCobro: any) {
    this.cobroService.showOne(idCobro).subscribe((resCobro: any) => {
      this.cobro = resCobro;
      $('#modalModificarCobro').modal();
      $("#modalModificarCobro").modal("open");
    }, err => console.error(err));
  }

guardarActualizarCobro() {
  console.log("Id de cobro a actualizar:", this.cobro.IdCobro); // Verifica que IdCobro tenga un valor válido
  this.cobroService.actualizarCobro(this.cobro).subscribe(() => {
    $('#modalModificarCobro').modal('close');
    this.showAlert('Cobro actualizado correctamente', 'success');
    //this.cdr.detectChanges();
    this.cobroService.list().subscribe((resusuario: any) => {
      this.cobros = resusuario;
  })
  }, err => {
    console.error(err);
    this.showAlert('Error al actualizar el pago', 'error');
  });
}

  guardarNuevoCobro(){
    this.nuevoCobro.Fecha_Cobro = this.Fecha_Cobro;
    console.log("GuardandoCobro")
    this.cobroService.addCobro(this.nuevoCobro).subscribe((res) => {
      $('#modalCrearCobro').modal('close');
      this.cobroService.list().subscribe(
        (resusuarios: any) => {
          this.cobro = resusuarios;
          console.log(resusuarios);
        },
        err => console.error(err)
        );
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Cobro Actualizado'
        });
      },
      err => {
        console.error(err);
        this.showAlert('Something went wrong!', 'error');
      }
    );
  }
  eliminarCobro(idCobro: any){
    console.log("Click en eliminar un cobro");
    console.log("Identificador del cobro: ",idCobro);
    Swal.fire({
      title: "¿Estás seguro de eliminar este cobro?",
      text: "¡No es posible revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, quiero eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cobroService.eliminarCobro(idCobro).subscribe((resCobro: any) =>
        {
         console.log("resCobro: ", resCobro);
         this.cobroService.list().subscribe((resCobro: any) =>
         {
           this.cobros = resCobro;  
           //console.log(resEmpresa);
           console.log(this.cobros)
         },
         err => console.error(err)
         );
        }, 
        err => console.error(err)
        );


        Swal.fire({
          title: "¡Eliminado!",
          text: "Tu cobro ha sido eliminado.",
          icon: "success"
        });
      }
    });

}
  updateFechaInicio(event: any) {
    this.nuevoCobro.Fecha_Cobro = event.target.value;
  }
  
  updateFechaFinal(event: any) {
    this.nuevoCobro.Fecha_Cobro = event.target.value;
  }
  showAlert(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    Swal.fire({
      position: 'center',
      icon: type,
      text: message
    });
  }
  submitForm() {
    // Ejecuta la función para guardar el nuevo usuario
    this.guardarNuevoCobro();
  
    // Redirige a la página principal
    window.location.href = '/principal';
  }
  }
  