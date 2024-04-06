import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit, AfterViewInit {

  ID_Cliente: any;

  constructor(private router: Router) { 
    //localStorage.setItem('TipoUsuario', "Admin");
    //localStorage.setItem('Usuario', "correo");
    //localStorage.setItem('Email', "correo");
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

  logout(){
    localStorage.removeItem("Tipo_Usuario")
    localStorage.removeItem("Email")
    localStorage.removeItem("ID_Cliente")
    location.reload();  //Se recarga la página para actualizar la barra de navegacion
    
}


}
