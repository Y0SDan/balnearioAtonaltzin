import { Component, OnInit } from '@angular/core';
import { Ofertas } from 'src/app/Models/Ofertas';
import { OfertaService } from './../../services/oferta.service';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {
  ofertas: Ofertas[] = [];
  oferta: Ofertas = new Ofertas();
  ofertaNuevo: Ofertas = new Ofertas();
  pageSize = 5;
  p = 1;

  constructor(private ofertaService: OfertaService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.recargarOfertas()
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
  }

  funcion(){
    console.log("prueba para las funciones");
    
  }

}
