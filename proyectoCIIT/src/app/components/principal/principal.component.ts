import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
declare var $: any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit, AfterViewInit {

  ID_Cliente: any;

  constructor(private router: Router, private translate: TranslateService) { 
  }

  ngOnInit(): void {
    this.ID_Cliente = localStorage.getItem('ID_Cliente');
    $(document).ready(function(){
      $('.carousel').carousel();
    });
    $(document).ready(function(){
      $('.slider').slider();
    });
    $(document).ready(function () { $(".dropdown-trigger").dropdown(); });
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
    this.router.navigateByUrl('/principal');
    location.reload();  //Se recarga la página para actualizar la barra de navegacion
    
}
redireccion(pagina:string){
  switch (pagina) {
    case "reserva":
      this.router.navigateByUrl('home/reserva');
      break;
    case "apartado":
      this.router.navigateByUrl('home/apartado')
      break;
    case "reservacion":
      this.router.navigateByUrl('home/reservacion')
      break;
    case "booking":
      this.router.navigateByUrl('home/booking')
      break;
    case "login":
        this.router.navigateByUrl('login')
        break;
    case "usuario":
        this.router.navigateByUrl('home/usuario')
        break;
    case "principal":
        this.router.navigateByUrl('/principal')
        break;
    default:
      console.log("Ocurrio un error");
      break;
    
  }
}
setIdioma(idioma: any) {
  if (idioma == 1)
    this.translate.use("en");
  if (idioma == 2)
    this.translate.use("es");
}


}
