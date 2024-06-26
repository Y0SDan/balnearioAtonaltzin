import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ApartadoComponent } from './components/apartado/apartado.component';
import { ReservacionComponent } from './components/reservacion/reservacion.component';
import { BookingComponent } from './components/booking/booking.component';
import { CabanaComponent } from './components/cabana/cabana.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavegaAdminComponent } from './components/navega-admin/navega-admin.component';
import { FooterComponent } from './components/footer/footer.component';
import { CobrosComponent } from './components/cobros/cobros.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ReservacionAdminComponent } from './components/reservacion-admin/reservacion-admin.component';
import { SellerComponent } from './components/seller/seller.component';
import { ReservacionUsuarioComponent } from './components/reservacion-usuario/reservacion-usuario.component';
import { OlvideContrasenaComponent } from './components/olvide-contrasena/olvide-contrasena.component';
import { RestablecerComponent } from './components/restablecer/restablecer.component';
import { OfertasComponent } from './components/ofertas/ofertas.component';




const routes: Routes = [
    {
        path: "",
        redirectTo: "/home/principal",
        pathMatch: "full"
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: 'principal',
                component: PrincipalComponent,
            },
            {
                path: 'cliente',
                component: ClienteComponent,
            },
            {
                path: 'admin',
                component: AdminComponent,
            },
            {
                path: 'reserva',
                component: ReservaComponent,
            },
            {
                path: 'apartado',
                component: ApartadoComponent,
            },
            {
                path: 'reservacion',
                component: ReservacionComponent,
            },
            {
                path: 'booking',
                component: BookingComponent,
            },
            {
                path: 'cabana',
                component: CabanaComponent,
            },
            {
                path: 'cobros',
                component: CobrosComponent,
            },
            {
                path: 'usuario',
                component: UsuarioComponent,
            },
            {
                path: 'reservacionAdmin',
                component: ReservacionAdminComponent,
            },
            {
                path: 'reservaciones-cliente',
                component: ReservacionUsuarioComponent,
            },
            {
                path: 'seller',
                component: SellerComponent,
            },
            {
                path: 'olvide-contrasena',
                component: OlvideContrasenaComponent,
            },
            {
                path: 'restablecer/:token',
                component: RestablecerComponent,
            },
            {
                path: 'ofertas',
                component: OfertasComponent,
            }
        ]
    },
    {
        path: 'homeA',
        component: HomeComponent,
        children: [
            {
                path: 'principal',
                component: PrincipalComponent,
            },
            {
                path: 'cliente',
                component: ClienteComponent,
            },
            {
                path: 'admin',
                component: AdminComponent,
            },
            {
                path: 'reserva',
                component: ReservaComponent,
            },
            {
                path: 'apartado',
                component: ApartadoComponent,
            },
            {
                path: 'reservacion',
                component: ReservacionComponent,
            },
            {
                path: 'booking',
                component: BookingComponent,
            },
            {
                path: 'cabana',
                component: CabanaComponent,
            },
            {
                path: 'cobros',
                component: CobrosComponent,
            },
            {
                path: 'usuario',
                component: UsuarioComponent,
            },
            {
                path: 'reservacionAdmin',
                component: ReservacionAdminComponent,
            },
            {
                path: 'reservaciones-cliente',
                component: ReservacionUsuarioComponent,
            },
            {
                path: 'seller',
                component: SellerComponent,
            },
            {
                path: 'olvide-contrasena',
                component: OlvideContrasenaComponent,
            },
            {
                path: 'restablecer/:token',
                component: RestablecerComponent,
            },
            {
                path: 'ofertas',
                component: OfertasComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }