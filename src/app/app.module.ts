import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Reactive Forms
import { ReactiveFormsModule } from "@angular/forms";
// Modulos
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
// Http
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Components
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AdminComponent } from './components/admin/admin.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { ErrorComponent } from './components/error/error.component';
import { EmpListComponent } from './components/admin/emp-list/emp-list.component';
import { ComandaComponent } from './components/empleado/mozo/comanda/comanda.component';
import { MesasComponent } from './components/admin/mesas/mesas.component';
import { MozoComponent } from './components/empleado/mozo/mozo.component';
import { EmpProductoresComponent } from './components/empleado/emp-productores/emp-productores.component';
import { ListadopedidosComponent } from './components/empleado/listadopedidos/listadopedidos.component';
import { EncuestaComponent } from './components/usuario/encuesta/encuesta.component';
import { EstadisticasComponent } from './components/admin/estadisticas/estadisticas.component';
import { StatsEmpleadosComponent } from './components/admin/estadisticas/stats-empleados/stats-empleados.component';
import { StatsPedidosComponent } from './components/admin/estadisticas/stats-pedidos/stats-pedidos.component';
import { StatsMesasComponent } from './components/admin/estadisticas/stats-mesas/stats-mesas.component';
import { BuscarpedidoComponent } from './components/usuario/buscarpedido/buscarpedido.component';
// Complementos
import { MaterialAndPrime } from './materialandprime';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
// servicios
import { AuthGuardService } from "./guards/auth-guard.service";
import { UsuariosService } from './services/usuarios.service';
import { HttpserviceService } from './services/httpservice.service';
import { AuthAdminService } from './services/auth-admin.service';
import { AuthEmpleadoService } from './services/auth-empleado.service';
import { AuthUserService } from './services/auth-user.service';
import { SinLogearAuthService } from './services/sin-logear-auth.service';
import { AuthService } from './services/auth.service';
import { AuthWardService } from './services/auth-ward.service';
// Directivas
import { ConfirmPasswordDirective } from './directives/confirm-password.directive';
import { JWTInterceptor } from './services/Interceptors/JWTInterceptor';
// Pipes
import { EstadoPipe } from './pipes/estado.pipe';
import { RolPipe } from './pipes/rol.pipe';
import { rolPipe } from './pipes/rol.pipe';
import { CodprodToNamePipe } from './pipes/codprod-to-name.pipe';
import { TestPipePipe } from './pipes/test-pipe.pipe';
import { EstadoPedidoPipe } from './pipes/estado-pedido.pipe';
import { EstadoMesaPipe } from './pipes/estado-mesa.pipe';
import { PrecioProductoPipe } from './pipes/precio-producto.pipe';
import { DemoraPedidoPipe } from './pipes/demora-pedido.pipe';
import { ComentariosComponent } from './components/admin/comentarios/comentarios.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    EmpleadoComponent,
    UsuarioComponent,
    AdminComponent,
    RegistrarComponent,
    ConfirmPasswordDirective,
    ErrorComponent,
    EmpListComponent,
    EstadoPipe,
    RolPipe,
    rolPipe,
    MesasComponent,
    MozoComponent,
    EmpProductoresComponent,
    ComandaComponent,
    CodprodToNamePipe,
    TestPipePipe,
    ListadopedidosComponent,
    EstadoPedidoPipe,
    BuscarpedidoComponent,
    EstadoMesaPipe,
    EncuestaComponent,
    EstadisticasComponent,
    StatsEmpleadosComponent,
    StatsPedidosComponent,
    StatsMesasComponent,
    PrecioProductoPipe,
    DemoraPedidoPipe,
    ComentariosComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialAndPrime,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ChartsModule,
    NgbModule
  ],
  exports: [MaterialAndPrime],
  providers: [HttpserviceService, UsuariosService, AuthAdminService, AuthEmpleadoService,
    AuthUserService, SinLogearAuthService, AuthService, AuthWardService, {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
