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
export class NavigationComponent implements OnInit, AfterViewInit {
  Tipo_Usuario: string = '';
  ID_Cliente: any;
  tipo: string
  idioma: any;
  
  constructor(private router: Router, private translate: TranslateService, private cambioIdiomaService: CambioIdiomaService) {
    this.tipo = String(localStorage.getItem('Tipo_Usuario'))
    console.log("Este es el tipo de ususario desde header ", this.tipo);

  }
  ngOnInit() {
    this.Tipo_Usuario = String(localStorage.getItem('Tipo_Usuario'));
    this.ID_Cliente = localStorage.getItem('ID_Cliente');
    console.log("Este es el tipo de usuario desde header ", this.Tipo_Usuario);
    console.log("Este es el ID_Cliente desde header ", this.ID_Cliente);
  }

  ngAfterViewInit(): void {   //Esto esta para que la condición *ngIf="ID_Cliente == undefined" no afecte al dropdown
    //$('.dropdown-trigger').dropdown();
    this.initializeDropdown();
  }

  initializeDropdown() {
    $('.dropdown-trigger').dropdown();
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


  gotoReservaciones(){
    this.router.navigateByUrl('/home/reservaciones-cliente')
  }

  logout(){
    localStorage.removeItem("Tipo_Usuario")
    localStorage.removeItem("Email")
    localStorage.removeItem("ID_Cliente")
    this.router.navigateByUrl('home/principal')

    this.ID_Cliente = null;
    this.Tipo_Usuario = '';

    this.initializeDropdown();
    location.reload();  //Se recarga la página para actualizar el local storage para principal
  }

  redireccion(pagina:string){
    switch (pagina) {
      case "login":
          this.router.navigateByUrl('login')
          break;
      case "usuario":
          this.router.navigateByUrl('home/usuario')
          break;
      default:
        console.log("Ocurrio un error");
        break;
      
    }
  }

}
