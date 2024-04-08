import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  redireccion(pagina:string){
    switch (pagina) {
      case "cliente":
        this.router.navigate(['home/cliente'])
        break;
      case "cabana":
        this.router.navigate(['home/cabana'])
        break;
      case "reservacion":
        this.router.navigate(['home/reservacionAdmin'])
        break;
      case "cobros":
        this.router.navigate(['home/cobros'])
        break;
      case "ofertas":
        this.router.navigate(['home/ofertas'])
        break;
      default:
        console.log("Ocurrio un error");
        break;
    }
  }
}
