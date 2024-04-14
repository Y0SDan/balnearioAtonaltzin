import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {Cabana1} from '../../Models/Cabana1';
import { CabanaService } from './../../services/cabana.service';

declare var $: any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit, AfterViewInit {

  ID_Cliente: any;
  Cabanas: Cabana1[] = [];
  Cabana: Cabana1 = new Cabana1();

  constructor(private router: Router, private CabanasServices:CabanaService) { 
    //localStorage.setItem('TipoUsuario', "Admin");
    //localStorage.setItem('Usuario', "correo");
    //localStorage.setItem('Email', "correo");
    this.CabanasServices.list().subscribe(
      (resusuario: any) => {
        this.Cabanas = resusuario;
        console.log(resusuario);
        
      },
      err => console.error(err)
    );
  }

  ngOnInit(): void {
    this.ID_Cliente = localStorage.getItem('ID_Cliente');
    
    $(document).ready(function(){
      $('.carousel').carousel();
    });
    $(document).ready(function(){
      $('.slider').slider();
    });
  }

  ngAfterViewInit(): void {   //Esto esta para que la condición *ngIf="ID_Cliente == undefined" no afecte al dropdown
    $('.dropdown-trigger').dropdown();
  }

  gotoReservaciones(){
    this.router.navigateByUrl('/home/reservaciones-cliente')
  }

  gotoCabana(id_cabana:any){
    this.router.navigateByUrl('/home/reserva')
    localStorage.setItem('Cabana',id_cabana);
  }

  logout(){
    localStorage.removeItem("Tipo_Usuario")
    localStorage.removeItem("Email")
    localStorage.removeItem("ID_Cliente")
    location.reload();  //Se recarga la página para actualizar la barra de navegacion
    
}


}
