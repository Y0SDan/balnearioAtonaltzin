import { Component, OnInit } from '@angular/core';
import { Cabana1 } from 'src/app/Models/Cabana1';
import { ImagenCabana } from 'src/app/Models/ImagenCabana';
import { CabanaService } from './../../services/cabana.service';
import { ImagenesService } from './../../services/imagenes.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { ImagenescabanasService } from 'src/app/services/imagenescabanas.service';
import { CambioIdiomaService } from 'src/app/services/cambio-idioma.service';
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
  //Variables para varias imagenes
  idImg = 0;
  imagencabana: ImagenCabana = new ImagenCabana();
  imagenescabana: ImagenCabana[] = [];
  imgColumnas: { [idCabana: number]: number } = {};
  idioma: any = 1;

  constructor(private cabanaService: CabanaService, private imagenesService: ImagenesService, private imagenescabanasService: ImagenescabanasService, private cambioIdiomaService: CambioIdiomaService) {
    this.imgCabana = null;
    this.fileToUpload = null;
    this.liga = environment.API_URL_IMAGENES;
    this.idioma = 1;
    //this.getLanguage(this.idioma);
    this.idioma = localStorage.getItem("idioma");
    console.log("idioma", this.idioma)
    if (this.idioma === null || this.idioma === undefined || this.idioma === '') {
      //Si el usuario no cambio el idioma lo dejamos por default en ingles
      localStorage.setItem("idioma","2"); 
      this.idioma= "2";
    }
  }
  
  ngOnInit(): void {
    this.cabanaService.list().subscribe((resusuario: any) => {
      this.cabanas = resusuario;
      this.cabanas.forEach(cabana => {
        this.obtenerImagen(cabana.ID_Cabana);
      });
    }, err => console.error(err));
    console.log(this.idioma);
    
    this.cambioIdiomaService.currentMsg$.subscribe(
      (msg) => {
        this.idioma = msg;
        console.log("idioma actual cabanas:", this.idioma, " aaaa");
      }
    );
  }

  crearcabana() {
    this.cabanaNueva = new Cabana1();
    console.log("Cliente Nuevo")
    $('#modalCrearCabana').modal();
    $("#modalCrearCabana").modal("open");
  }
  guardarNuevaCabana() {
    console.log("GuardandoUsuario")
    if (this.idioma != 1) {
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
          text: 'Cabaña agragada'
        });
      },
        err => {
          console.error(err);
          this.showAlert('Something went wrong!', 'error');
        }
      );
    } else {
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
          text: "Aggregated cabin"
        });
      },
        err => {
          console.error(err);
          this.showAlert('Something went wrong!', 'error');
        }
      );
    }
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
    console.log(this.idioma);
    
    if (this.idioma != 1 ) {
      this.cabanaService.actualizarCabana(this.cabana).subscribe((res) => {
        $('#modalModificarCabana').modal('close');
        this.showAlert('Cabaña actualizada correctamente', 'success');
        this.cabanaService.list().subscribe((resusuario: any) => {
          this.cabanas = resusuario;
        })
      }, err => {
        console.error(err);
        this.showAlert('Error al actualizar la cabaña', 'error');
      });
    }
    else {
      this.cabanaService.actualizarCabana(this.cabana).subscribe((res) => {
        $('#modalModificarCabana').modal('close');
        this.showAlert('Cabin properly upgraded', 'success');
        this.cabanaService.list().subscribe((resusuario: any) => {
          this.cabanas = resusuario;
        })
      }, err => {
        console.error(err);
        this.showAlert('Error updating the cabin', 'error');
      });
    }
  }
  eliminarCabana(id: any) {
    console.log("Click en eliminar esta cabaña");
    console.log("Identificador del Cliente: ", id);
    if (this.idioma != 1) {
      Swal.fire({
        title: " ¿Estás seguro de eliminar esta cabaña?",
        text: "¡No es posible revertir esta acción!",
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
    } else {
      Swal.fire({
        title: "Are you sure to eliminate this cabin?",
        text: "It is not possible to reverse this action!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want to eliminate it!",
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
            title: "Deleted!",
            text: "Your file has been deleted",
            icon: "success"
          });
        }
      });
    }
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


  metodoPrueba() {
    console.log(this.cabanaNueva);
  }

  addImagen(idCabana: any) {
    this.cabanaService.listOne(idCabana).subscribe((resCliente: any) => {
      this.cabana = resCliente;
      $('#modalAgregarImagen').modal();
      $("#modalAgregarImagen").modal("open");
    }, err => console.error(err));
  }

  cargandoImagen(archivo: any) {
    this.imagenescabanasService.crearImagenCabana({ ID_Cabana: this.cabana.ID_Cabana }).subscribe((res: any) => {
      this.idImg = res.insertId;

      // Se movio el codigo acá para que respete el valor de idImg en ves de ir abajo
      this.imgCabana = null;
      this.liga = environment.API_URL_IMAGENES;
      this.fileToUpload = archivo.files.item(0);
      let imgPromise = this.getFileBlob(this.fileToUpload);
      imgPromise.then(blob => {
        this.imagenesService.guardarImagen(this.idImg, "cabanas", blob).subscribe(
          (res: any) => {
            this.imgCabana = blob;
            // Actualizar la variable 'liga' después de cargar la imagen
            this.liga = environment.API_URL_IMAGENES + "/cabanas/" + this.idImg + ".jpg";
            this.cabanaService.list().subscribe((resCabanas: any) => {
              this.cabanas = resCabanas;
            }, err => console.error(err));
            this.liga = environment.API_URL_IMAGENES;
          },
          err => console.error(err));
      });
      //en lugar de acá
      this.cabana.foto = 1;
    },
      err => {
        console.error(err);
      });
  }

  /*
  this.cabanaService.actualizarCabana(this.cabana).subscribe(() => {
    this.cabana.foto = 0;

  }, err => {
    console.error(err);
  });
  */


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

  guardarActualizarCabanaImg() {
    if (this.idioma == 2) {
      this.cabanaService.actualizarCabana(this.cabana).subscribe((res) => {
        this.showAlert('Imagen actualizada correctamente', 'success');
        this.cabanaService.list().subscribe((resusuario: any) => {
          this.cabanas = resusuario;
        })
      }, err => {
        console.error(err);
        this.showAlert('Error al actualizar la imagen', 'error');
      });
      //location.reload();  //Se actualiza la pagina para el caso en el que se actualice la imagen de una cabaña
    }
    else { 
      this.cabanaService.actualizarCabana(this.cabana).subscribe((res) => {
        this.showAlert('Image updated correctly', 'success');
        this.cabanaService.list().subscribe((resusuario: any) => {
          this.cabanas = resusuario;
        })
      }, err => {
        console.error(err);
        this.showAlert('Error updating image', 'error');
      });
    }
    location.reload();
  }



    mostrarImagenes(idCabana: any) {
      this.cabanaService.listOne(idCabana).subscribe((resusuario: any) => {
        this.cabana = resusuario;
        this.imagenescabanasService.mostrarImagenesPorCabana(idCabana).subscribe((res: any) => {
          this.imagenescabana = res;
        }, err => console.error(err));
        $('#modalmostrarImagenes').modal();
        $("#modalmostrarImagenes").modal("open");
      }, err => console.error(err));

    }

    obtenerImagen(idCabana: any) {
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