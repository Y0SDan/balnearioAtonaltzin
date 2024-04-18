import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { CambioIdiomaService } from '../../services/cambio-idioma.service';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  tipo: string
  ID_Cliente: any;
  idioma: any;
  constructor(private router: Router, private translate: TranslateService, private cambioIdiomaService: CambioIdiomaService) {
    this.tipo = String(localStorage.getItem('Tipo_Usuario'))
    console.log("Este es el tipo de ususario desde header ", this.tipo);

  }
  enviarMensajeIdioma(idioma: any) {
    this.cambioIdiomaService.sendMsg(idioma);
  }
  setIdioma(idioma: any) {
    if (idioma == 1) {
      this.translate.use("en");
      this.enviarMensajeIdioma(1);
    }
    if (idioma == 2) {
      this.translate.use("es");
      this.enviarMensajeIdioma(2);
    }
  }

ngOnInit() {
  this.ID_Cliente = localStorage.getItem('ID_Cliente');
  $(".dropdown-trigger").dropdown();
  $(document).ready(function () {
    $('.slider').slider();
  });
  $(document).ready(function () { $(".dropdown-trigger").dropdown(); });
}
ngAfterViewInit(): void {   //Esto esta para que la condición *ngIf="ID_Cliente == undefined" no afecte al dropdown
  $('.dropdown-trigger').dropdown();
}
logout(){
  localStorage.removeItem("Tipo_Usuario")
  localStorage.removeItem("Email")
  localStorage.removeItem("ID_Cliente")
  localStorage.removeItem("Cabana")

  this.router.navigateByUrl('/principal')
}
redireccion(pagina: string){
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
}
