import { Component, OnInit } from '@angular/core';
import { ReservacionAdmin } from 'src/app/Models/ReservacionAdmin';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-reservacion-usuario',
  templateUrl: './reservacion-usuario.component.html',
  styleUrls: ['./reservacion-usuario.component.css']
})
export class ReservacionUsuarioComponent implements OnInit {

  reservaciones : ReservacionAdmin [] = [];
  ID_Cliente: any;
  pageSize = 5;
  p = 1;

  constructor(private reservaService : ReservaService) { }

  ngOnInit(): void {
    this.ID_Cliente = localStorage.getItem('ID_Cliente');

    this.reservaService.listByUser(this.ID_Cliente).subscribe((resReservas: any) => {
      this.reservaciones = resReservas;
    },err => console.error(err));

    console.log("Reservaciones del usuario",this.reservaciones)
  }

}
