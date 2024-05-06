import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { CambioIdiomaService } from '../../services/cambio-idioma.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, AfterViewInit {
  Tipo_Usuario: string = '';
  ID_Cliente: any;
  tipo: string;
  idioma: any;
  
  constructor(private router: Router, private translate: TranslateService, private cambioIdiomaService: CambioIdiomaService) {
    this.tipo = String(localStorage.getItem('Tipo_Usuario'));
    console.log("Este es el tipo de ususario desde header ", this.tipo);
    
    
    // Obtener el idioma del almacenamiento local
    this.idioma = localStorage.getItem("idioma") || "es";
    console.log("idioma", this.idioma);
  
    // Verificar si el idioma está configurado
    if (this.idioma === null || this.idioma === undefined || this.idioma === '') {
      // Si el idioma no está configurado, establecerlo en español por defecto (idioma 2)
      localStorage.setItem("idioma", "2"); 
      this.idioma = "2";
    }

    // Establecer el idioma predeterminado según el valor configurado
    if (this.idioma === "2") {
      this.translate.setDefaultLang('es');
    } else {
      this.translate.setDefaultLang('en');
    }
    
  }

  
  ngOnInit() {
    this.Tipo_Usuario = String(localStorage.getItem('Tipo_Usuario'));
    this.ID_Cliente = localStorage.getItem('ID_Cliente');
    console.log("Este es el tipo de usuario desde header ", this.Tipo_Usuario);
    console.log("Este es el ID_Cliente desde header ", this.ID_Cliente);

    this.cambioIdiomaService.currentMsg$.subscribe(
      (msg) => {
        this.idioma = msg;
        console.log("Valor de idioma recibido:", this.idioma);
        
      } );
  }

  ngAfterViewInit(): void {
    //Esto está para que la condición *ngIf="ID_Cliente == undefined" no afecte al dropdown
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
    this.router.navigateByUrl('/home/reservaciones-cliente');
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
  
  redireccion(pagina: string) {
    switch (pagina) {
      case "login":
          this.router.navigateByUrl('login');
          break;
      case "usuario":
          this.router.navigateByUrl('home/usuario');
          break;
      default:
        console.log("Ocurrió un error");
        break;
    }
  }

  getBanderaSrc(idioma: string): string {
    let rutaImagen = '';
    if (idioma === 'en') {
      rutaImagen = 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg';
    } else if (idioma === 'es') {
      rutaImagen = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1280px-Flag_of_Mexico.svg.png';
    }
    return rutaImagen;
  }
  
  
}

