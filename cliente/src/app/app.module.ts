import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { LoginComponent } from './components/login/login.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { HomeComponent } from './components/home/home.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavegaAdminComponent } from './components/navega-admin/navega-admin.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './components/admin/admin.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ApartadoComponent } from './components/apartado/apartado.component';
import { ReservacionComponent } from './components/reservacion/reservacion.component';
import { BookingComponent } from './components/booking/booking.component';
import { CobrosComponent } from './components/cobros/cobros.component';
import { CabanaComponent } from './components/cabana/cabana.component';
import { RestablecerComponent } from './components/restablecer/restablecer.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ReservacionAdminComponent } from './components/reservacion-admin/reservacion-admin.component';
import { SellerComponent } from './components/seller/seller.component';
import { ReservacionUsuarioComponent } from './components/reservacion-usuario/reservacion-usuario.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OlvideContrasenaComponent } from './components/olvide-contrasena/olvide-contrasena.component';
import { OfertasComponent } from './components/ofertas/ofertas.component';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CambioIdiomaService } from './services/cambio-idioma.service';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common'; 



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/traducciones/", ".json");
  }

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
    ClienteComponent,
    HomeComponent,
    HomeAdminComponent,
    NavigationComponent,
    NavegaAdminComponent,
    FooterComponent,
    AdminComponent,
    ReservaComponent,
    ApartadoComponent,
    ReservacionComponent,
    BookingComponent,
    CobrosComponent,
    CabanaComponent,
    RestablecerComponent,
    UsuarioComponent,
    ReservacionAdminComponent,
    SellerComponent,
    ReservacionUsuarioComponent,
    OlvideContrasenaComponent,
    OfertasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Agrega FormsModule aquí
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
      },
      }),
    NgxPaginationModule,
  ],
  providers: [{provide : LocationStrategy , useClass: HashLocationStrategy},
    CambioIdiomaService],
  bootstrap: [AppComponent]
})
export class AppModule { }