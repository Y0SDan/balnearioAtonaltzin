import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Models/Cliente';
import { ClienteService } from './../../services/cliente.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  clientes : Cliente [] = [];
  cliente: Cliente = new Cliente();
  clienteNuevo: Cliente = new Cliente();

  constructor(private clienteService: ClienteService) {
  }
  ngOnInit(): void {
    this.clienteService.list().subscribe((resusuario: any) => {
      this.clientes = resusuario;
  }, err => console.error(err));
  $(document).ready(function(){
    $('.modal').modal();
  });
  }
  addCliente() {
    this.clienteNuevo = new Cliente();
    console.log("Usuario Nuevo")
    $('#modalCrearCliente').modal();
    $("#modalCrearCliente").modal("open");
  }
  guardarNuevoUsuario(){
    console.log("GuardandoUsuario")
    this.clienteService.addCliente(this.clienteNuevo).subscribe((res) => {
      $('#modalCrearCliente').modal('close');
      this.clienteService.list().subscribe((resusuario: any) => {
        this.clientes = resusuario;
    }, err => console.error(err));
    Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Plan Actualizado'
    })
}, err => console.error(err));

  
  }     

  eliminarUsuario(id : any){
    console.log("Click en eliminar Cliente");
    console.log("Identificador del Cliente: ",id);
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
        this.clienteService.eliminarUsuario(id).subscribe((resusuario: any) =>
        {
         console.log("resusuario: ", resusuario);
         this.clienteService.list().subscribe((resusuario: any) =>
         {
           this.clientes = resusuario;  
           //console.log(resusuario);
           console.log(this.clientes)
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
    MostrarCliente(){
      console.log("Mostrarclientes")
    
      this.clienteService.addCliente(this.clienteNuevo).subscribe((res) => {
        -$('#modalCrearCliente').modal('close');
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
    });
    }    
    actuzalizarCliente(ID_Cliente: any) {
      this.clienteService.showOne(ID_Cliente).subscribe((resusuario: any) => {
          this.cliente = resusuario;
          console.log(this.cliente)
          $('#modalModificarCliente').modal();
          $("#modalModificarCliente").modal("open");
      }, err => console.error(err));
    }
    guardarActualizarCliente() {
      this.clienteService.actualizarCliente(this.cliente).subscribe((res) => {
          $('#modalModificarCliente').modal('close');
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
      });
    }submitForm() {
      // Ejecuta la función para guardar el nuevo usuario
      this.guardarNuevoUsuario();
    
      // Redirige a la página principal
      window.location.href = '/principal';
    }
    metodoPrueba(){
      console.log(this.clienteNuevo);
    }
    showAlert(message: string, type: 'success' | 'error' | 'warning' = 'success') {
      // Define el estilo del mensaje de alerta
      const alertStyle = {
        success: {
          backgroundColor: '#4CAF50', // Verde para éxito
          color: '#FFF',
        },
        error: {
          backgroundColor: '#f44336', // Rojo para error
          color: '#FFF',
        },
        warning: {
          backgroundColor: '#ff9800', // Naranja para advertencia
          color: '#FFF',
        },
      };
    
      // Crea un elemento div para mostrar el mensaje de alerta
      const alertElement = document.createElement('div');
      alertElement.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        z-index: 9999;
        ${alertStyle[type]}
      `;
      alertElement.textContent = message;
    
      // Agrega el elemento al cuerpo del documento
      document.body.appendChild(alertElement);
    
      // Borra el mensaje después de 3 segundos
      setTimeout(() => {
        alertElement.remove();
      }, 3000);
    }
  }