import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Models/Cliente';
import { ClienteService } from './../../services/cliente.service';
import { ImagenesService } from './../../services/imagenes.service';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
declare var $: any;
declare var M: any;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  cliente: Cliente = new Cliente();
  clienteNuevo: Cliente = new Cliente();
  pageSize = 5;
  p = 1;
  liga='';
  imgUsuario: any;
  fileToUpload: any;

  constructor(private clienteService: ClienteService,private imagenesService: ImagenesService, private cdr: ChangeDetectorRef) {
    this.imgUsuario = null;
    this.fileToUpload = null;
    this.liga = environment.API_URL_IMAGENES;
  }

  ngOnInit(): void {
    this.clienteService.list().subscribe(
      (resusuario: any) => {
        this.clientes = resusuario;
      },
      err => console.error(err)
    );
    this.recargarUsuario();
    $(document).ready(function(){
      $('.modal').modal();
    });
    $(document).ready(function(){
      $('select').formSelect();
    });
    M.AutoInit();
  }

  addCliente() {
    this.clienteNuevo = new Cliente();
    $('#modalCrearCliente').modal();
    $("#modalCrearCliente").modal("open");
  }

  guardarNuevoUsuario() {
    this.clienteService.addCliente(this.clienteNuevo).subscribe(
      (res) => {
        $('#modalCrearCliente').modal('close');
        this.clienteService.list().subscribe(
          (resusuario: any) => {
            this.clientes = resusuario;
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

  eliminarUsuario(id: any) {
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
        this.clienteService.eliminarUsuario(id).subscribe(
          (resusuario: any) => {
            this.clienteService.list().subscribe(
              (resusuario: any) => {
                this.clientes = resusuario;
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
    this.clienteService.addCliente(this.clienteNuevo).subscribe(
      (res) => {
        $('#modalCrearCliente').modal('close');
        this.clienteService.list().subscribe(
          (resusuarios: any) => {
            this.cliente = resusuarios;
          },
          (err: any) => {
            console.error(err);
            this.showAlert('Something went wrong!', 'error');
          }
        );
      }
    );
  }

  actualizarCliente(idCliente: number) {
    this.clienteService.showOne(idCliente).subscribe((resusuario: any) => {
      this.cliente = resusuario;
      $('#modalModificarCliente').modal();
      $("#modalModificarCliente").modal("open");
    }, err => console.error(err));
  }
  
  showAlert(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    Swal.fire({
      position: 'center',
      icon: type,
      text: message
    });
  }

  guardarActualizarCliente() {
    this.clienteService.actualizarCliente(this.cliente).subscribe(() => {
      $('#modalModificarCliente').modal('close');
      this.showAlert('Cliente actualizado correctamente', 'success');
      this.cdr.detectChanges();
      this.clienteService.list().subscribe((resusuario: any) => {
        this.clientes = resusuario;
    })
    }, err => {
      console.error(err);
      this.showAlert('Error al actualizar el cliente', 'error');
    });
  }

  submitForm() {
    // Ejecuta la función para guardar el nuevo usuario
    this.guardarNuevoUsuario();
    // Redirige a la página principal
    window.location.href = '/principal';
  }

  metodoPrueba() {
    console.log(this.clienteNuevo);
  }
  recargarUsuario() {
    this.clienteService.list().subscribe((resReservas: any) => {
      this.clientes = resReservas;
    },err => console.error(err));
    this.liga=environment.API_URL_IMAGENES;
    console.log(this.liga + "   recarga");
    
  } 

  compareFn(a : any, b : any) {
    return a === b;
  }

  seleccionarCliente(cliente: Cliente) {
    this.cliente = cliente;
    this.liga = environment.API_URL_IMAGENES + "/clientes/" + this.cliente.ID_Cliente + ".jpg";
  }
  MostrarImagen(idCliente: number) {
    this.clienteService.showOne(idCliente).subscribe((resCliente: any) => {
      this.cliente = resCliente;
      $('#modalAgregarImagen').modal();
      $("#modalAgregarImagen").modal("open");
    }, err => console.error(err));
  }
  cargandoImagen(archivo: any) {
    this.imgUsuario = null;
    this.liga = environment.API_URL_IMAGENES;
    this.fileToUpload = archivo.files.item(0);
    let imgPromise = this.getFileBlob(this.fileToUpload);
    imgPromise.then(blob => {
      console.log("convirtiendo imagen")
      this.imagenesService.guardarImagen(this.cliente.ID_Cliente, "clientes", blob).subscribe(
        (res: any) => {
          this.imgUsuario = blob;
          console.log("Cliente id: ", this.cliente.ID_Cliente);
          // Actualizar la variable 'liga' después de cargar la imagen
          this.liga = environment.API_URL_IMAGENES + "/clientes/" + this.cliente.ID_Cliente + ".jpg";
          console.log(this.cliente.ID_Cliente);
          console.log(this.liga);
          this.clienteService.list().subscribe((resUsuarios: any) => {
            this.cliente = resUsuarios;
          }, err => console.error(err));
          this.liga=environment.API_URL_IMAGENES;
        },
        err => console.error(err));
    });
    this.cliente.foto=1;
    console.log("Antes Foto = "+this.cliente.foto);
    this.clienteService.actualizarCliente(this.cliente).subscribe(() => {
      this.cliente.foto=0;
      console.log("Despues Foto = "+this.cliente.foto);
      
    }, err => {
      console.error(err);
    });

    this.recargarUsuario();
  }

  getFileBlob(file: any) {
    var reader = new FileReader();
    return new Promise(function (resolve, reject) { //Espera a que se cargue la img
      reader.onload = (function (thefile) {
        return function (e) {
          // console.log(e.target?.result)
          resolve(e.target?.result);
        };
  
      })(file);
      reader.readAsDataURL(file);
    });
  }
}
