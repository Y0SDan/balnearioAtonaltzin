import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  tipo:string
  ID_Cliente: any;
  
  constructor(private router: Router) { 
   this.tipo=String(localStorage.getItem('Tipo_Usuario'))
   console.log("Este es el tipo de ususario desde header ",this.tipo);
  }

  ngOnInit() {
    this.ID_Cliente = localStorage.getItem('ID_Cliente');
    $(".dropdown-trigger").dropdown();
    
  }
  ngAfterViewInit(): void {   //Esto esta para que la condición *ngIf="ID_Cliente == undefined" no afecte al dropdown
    $('.dropdown-trigger').dropdown();
  } 
  logout(){
    localStorage.removeItem("Tipo_Usuario")
    localStorage.removeItem("Email")
    localStorage.removeItem("ID_Cliente")
    this.router.navigateByUrl('/principal')
  }

}
