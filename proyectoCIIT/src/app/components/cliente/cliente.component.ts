import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Models/Cliente';
import { ClienteService } from './../../services/cliente.service';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
declare var $: any;

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

  constructor(private clienteService: ClienteService, private cdr: ChangeDetectorRef) {}

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
  }

  addCliente() {
    this.clienteNuevo = new Cliente();
    console.log("Usuario Nuevo");
    $('#modalCrearCliente').modal();
    $("#modalCrearCliente").modal("open");
  }

  guardarNuevoUsuario() {
    console.log("GuardandoUsuario");
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
    console.log("Click en eliminar Cliente");
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
        this.clienteService.eliminarUsuario(id).subscribe(
          (resusuario: any) => {
            console.log("resusuario: ", resusuario);
            this.clienteService.list().subscribe(
              (resusuario: any) => {
                this.clientes = resusuario;
                console.log(this.clientes);
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
    console.log("Mostrarclientes");

    this.clienteService.addCliente(this.clienteNuevo).subscribe(
      (res) => {
        $('#modalCrearCliente').modal('close');
        this.clienteService.list().subscribe(
          (resusuarios: any) => {
            this.cliente = resusuarios;
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

  actualizarCliente(idCliente: number) {
    this.clienteService.showOne(idCliente).subscribe((resusuario: any) => {
      this.cliente = resusuario;
      console.log(this.cliente)
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
  }

}
