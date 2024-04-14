import { Component, OnInit } from '@angular/core';
import { Cabana1 } from 'src/app/Models/Cabana1';
import { CabanaService } from './../../services/cabana.service';
import { ImagenesService } from './../../services/imagenes.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-cabana',
  templateUrl: './cabana.component.html',
  styleUrls: ['./cabana.component.css']
})
export class CabanaComponent implements OnInit {

  cabanas: Cabana1[] = [];
  cabana: Cabana1 = new Cabana1();
  cabanaNueva: Cabana1 = new Cabana1();
  pageSize = 5;
  p = 1;
  //Variables para imagenes
  liga = '';
  imgCabana: any;
  fileToUpload: any;

  constructor(private cabanaService: CabanaService, private imagenesService: ImagenesService) {
    this.imgCabana = null;
    this.fileToUpload = null;
    this.liga = environment.API_URL_IMAGENES;
  }
  ngOnInit(): void {
    this.cabanaService.list().subscribe((resusuario: any) => {
      this.cabanas = resusuario;
    }, err => console.error(err));
  }
  crearcabana() {
    this.cabanaNueva = new Cabana1();
    console.log("Cliente Nuevo")
    $('#modalCrearCabana').modal();
    $("#modalCrearCabana").modal("open");
  }
  guardarNuevaCabana() {
    console.log("GuardandoUsuario")
    this.cabanaService.crearcabana(this.cabanaNueva).subscribe((res) => {
      $('#modalCrearCabana').modal('close');
      this.cabanaService.list().subscribe(
        (resusuarios: any) => {
          this.cabanas = resusuarios;
        },
        err => console.error(err)
      );
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Plan Actualizado'
      });
    },
      err => {
        console.error(err);
        this.showAlert('Something went wrong!', 'error');
      }
    );
  }
  actualizarCabana(Nombre: any) {
    this.cabanaService.listOne(Nombre).subscribe((resusuario: any) => {
      this.cabana = resusuario;
      console.log(this.cabana)
      $('#modalModificarCabana').modal();
      $("#modalModificarCabana").modal("open");
    }, err => console.error(err));
  }
  showAlert(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    Swal.fire({
      position: 'center',
      icon: type,
      text: message
    });
  }
  guardarActualizarCabana() {
    this.cabanaService.actualizarCabana(this.cabana).subscribe((res) => {
      $('#modalModificarCabana').modal('close');
      this.showAlert('Cabaña actualizada correctamente', 'success');
      this.cabanaService.list().subscribe((resusuario: any) => {
        this.cabanas = resusuario;
      })
    }, err => {
      console.error(err);
      this.showAlert('Error al actualizar el cliente', 'error');
    });
    location.reload();  //Se actualiza la pagina para el caso en el que se actualice la imagen de una cabaña
  }
  eliminarCabana(id: any) {
    console.log("Click en eliminar esta cabaña");
    console.log("Identificador del Cliente: ", id);
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No es posible revertir este!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, quiero eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cabanaService.eliminarCabana(id).subscribe((resusuario: any) => {
          console.log("resusuario: ", resusuario);
          this.cabanaService.list().subscribe((resusuario: any) => {
            this.cabanas = resusuario;
            //console.log(resusuario);
            console.log(this.cabanas)
          },
            err => console.error(err)
          );
        },
          err => console.error(err)
        );


        Swal.fire({
          title: "Eliminado!",
          text: "Tu archivo ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  MostrarCliente() {
    console.log("MostrarCabanas");

    this.cabanaService.crearcabana(this.cabanaNueva).subscribe(
      (res) => {
        $('#modalCrearCabana').modal('close');
        this.cabanaService.list().subscribe(
          (resusuarios: any) => {
            this.cabana = resusuarios;
            console.log(resusuarios);
          },
          (err: any) => {
            console.error(err);
            this.showAlert('Something went wrong!', 'error');
          }
        );
      }
    );
  }

  submitForm() {
    // Ejecuta la función para guardar el nuevo usuario
    this.guardarNuevaCabana();

    // Redirige a la página principal
    window.location.href = '/principal';
  }

  metodoPrueba() {
    console.log(this.cabanaNueva);
  }

  MostrarImagen(idCabana: any) {
    this.cabanaService.listOne(idCabana).subscribe((resCliente: any) => {
      this.cabana = resCliente;
      $('#modalAgregarImagen').modal();
      $("#modalAgregarImagen").modal("open");
    }, err => console.error(err));
  }

  cargandoImagen(archivo: any) {
    this.imgCabana = null;
    this.liga = environment.API_URL_IMAGENES;
    this.fileToUpload = archivo.files.item(0);
    let imgPromise = this.getFileBlob(this.fileToUpload);
    imgPromise.then(blob => {
      this.imagenesService.guardarImagen(this.cabana.ID_Cabana, "cabanas", blob).subscribe(
        (res: any) => {
          this.imgCabana = blob;
          // Actualizar la variable 'liga' después de cargar la imagen
          this.liga = environment.API_URL_IMAGENES + "/cabanas/" + this.cabana.ID_Cabana + ".jpg";
          this.cabanaService.list().subscribe((resCabanas: any) => {
            this.cabanas = resCabanas;
          }, err => console.error(err));
          this.liga = environment.API_URL_IMAGENES;
        },
        err => console.error(err));
    });
    
    this.cabana.foto = 1;
    /*
    this.cabanaService.actualizarCabana(this.cabana).subscribe(() => {
      this.cabana.foto = 0;

    }, err => {
      console.error(err);
    });
    */
  }

  getFileBlob(file: any) {
    var reader = new FileReader();
    return new Promise(function (resolve, reject) { //Espera a que se cargue la img
      reader.onload = (function (thefile) {
        return function (e) {
          resolve(e.target?.result);
        };
  
      })(file);
      reader.readAsDataURL(file);
    });
  }

}

