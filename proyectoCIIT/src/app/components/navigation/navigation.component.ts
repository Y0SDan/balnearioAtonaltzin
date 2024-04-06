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
  
  constructor(private router: Router) { 
   this.tipo=String(localStorage.getItem('Tipo_Usuario'))
   console.log("Este es el tipo de ususario desde header ",this.tipo);
  }

  ngOnInit() {
    $(".dropdown-trigger").dropdown();
  }
  logout(){
    localStorage.removeItem("Tipo_Usuario")
    localStorage.removeItem("Email")
    localStorage.removeItem("ID_Cliente")
    this.router.navigate(['principal'])
  }

}
