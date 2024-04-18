import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, AfterViewInit {
  Tipo_Usuario: string = '';
  ID_Cliente: any;
  
  
  constructor(private router: Router, private changeDetector: ChangeDetectorRef) { 
    
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

  gotoReservaciones(){
    this.router.navigateByUrl('/home/reservaciones-cliente')
  }

  logout(){
    localStorage.removeItem("Tipo_Usuario")
    localStorage.removeItem("Email")
    localStorage.removeItem("ID_Cliente")
    this.router.navigateByUrl('home/principal')
    //location.reload();  //Se recarga la página para actualizar la barra de navegacion

    this.ID_Cliente = null;
    this.Tipo_Usuario = '';

    this.initializeDropdown();
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
