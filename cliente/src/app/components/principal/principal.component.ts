import { Component, OnInit } from '@angular/core';
import { Cabana1 } from 'src/app/Models/Cabana1';
import { ImagenCabana } from 'src/app/Models/ImagenCabana';
import { CabanaService } from './../../services/cabana.service';
import { ImagenescabanasService } from 'src/app/services/imagenescabanas.service';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  ID_Cliente: any;
  idioma: any = 1;
  cabanas: Cabana1[] = [];
  cabana: Cabana1 = new Cabana1();
  imagenescabana: ImagenCabana[] = [];
  imgColumnas: { [idCabana: number]: number } = {};
  liga = '';

  constructor(private router: Router, private cabanaService: CabanaService, private imagenescabanasService: ImagenescabanasService, private cambioIdiomaService: CambioIdiomaService) {
    this.liga = environment.API_URL_IMAGENES;
    this.ID_Cliente = localStorage.getItem("ID_Cliente");
    this.idioma = localStorage.getItem("idioma");
    this.cambioIdiomaService.currentMsg$.subscribe(
      (msg) => {
        if (msg != '') {
          this.idioma = msg;
        }
      }
    );
  }

  ngOnInit(): void {
    this.cabanaService.list().subscribe((resusuario: any) => {
      this.cabanas = resusuario;
      this.cabanas.forEach(cabana => {
        this.obtenerImagenCabana(cabana.ID_Cabana);
      });
    }, err => console.error(err));

    $(document).ready(function () {
      $('.carousel').carousel();
    });
    $(document).ready(function () {
      $('.slider').slider();
    });
  }

  redireccion(pagina: string, idCabana: any) {
    switch (pagina) {
      case "reserva":
        if (this.ID_Cliente == null) {
          this.router.navigateByUrl('login');
        }
        else {
          localStorage.setItem('ID_Cabana', idCabana);
          this.router.navigateByUrl('home/reserva');
        }
        break;
      default:
        console.log("Ocurrio un error");
        break;

    }
  }

  obtenerImagenCabana(idCabana: any) {
    this.cabanaService.listOne(idCabana).subscribe((resusuario: any) => {
      this.cabana = resusuario;
      this.imagenescabanasService.mostrarImagenesPorCabana(idCabana).subscribe((res: any) => {
        this.imagenescabana = res;
        // Para ver que imagenescabana no esté vacío
        if (this.imagenescabana.length > 0) {
          // Use Math.max con map para obtener el id más grande
          this.imgColumnas[idCabana] = Math.max(...this.imagenescabana.map(imagen => imagen.id)); // ... es operador de propagación o spread operator se utiliza para expandir elementos iterables, como un array, en lugares donde se esperan cero o más argumentos (para llamadas a funciones) o elementos (para arrays literales)
        }
      }, err => console.error(err));
    }, err => console.error(err));
  }

}
