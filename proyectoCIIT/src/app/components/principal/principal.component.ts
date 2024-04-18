import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  ID_Cliente: any;

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
    $(document).ready(function(){
      $('.carousel').carousel();
    });
    $(document).ready(function(){
      $('.slider').slider();
    });
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
    case "principal":
        this.router.navigateByUrl('/principal')
        break;
    default:
      console.log("Ocurrio un error");
      break;
    
  }
}


}
