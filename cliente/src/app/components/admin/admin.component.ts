import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  idioma: any;
  constructor(private router: Router, private cambioIdiomaService: CambioIdiomaService) {
    this.idioma = 1;
  }

  ngOnInit(): void {
    this.cambioIdiomaService.currentMsg$.subscribe(
      (msg) => {
        this.idioma = msg;
        console.log("idioma actual:", this.idioma, " aaaa");
      }
    );
  }

redireccion(pagina: string){
  switch (pagina) {
    case "cliente":
      this.router.navigateByUrl('home/cliente')
      break;
    case "cabana":
      this.router.navigateByUrl('home/cabana')
      break;
    case "reservacion":
      this.router.navigateByUrl('home/reservacionAdmin')
      break;
    case "cobros":
      this.router.navigateByUrl('home/cobros')
      break;
    case "ofertas":
      this.router.navigateByUrl('home/ofertas')
      break;
    default:
      console.log("Ocurrio un error");
      break;
  }
}
}