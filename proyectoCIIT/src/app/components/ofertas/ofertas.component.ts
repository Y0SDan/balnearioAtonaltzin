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

  funcion(){
    console.log("prueba para las funciones");
    
  }
}
