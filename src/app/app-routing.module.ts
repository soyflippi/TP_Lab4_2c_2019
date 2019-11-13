import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { ErrorComponent } from './components/error/error.component';
import { EmpListComponent } from './components/admin/emp-list/emp-list.component';
import { AuthService } from './services/auth.service';
import { MesasComponent } from './components/admin/mesas/mesas.component';
import { MozoComponent } from './components/empleado/mozo/mozo.component';
import { ComandaComponent } from './components/empleado/mozo/comanda/comanda.component';
import { ListadopedidosComponent } from './components/empleado/listadopedidos/listadopedidos.component';
import { BuscarpedidoComponent } from './components/usuario/buscarpedido/buscarpedido.component';
import { EstadisticasComponent } from './components/admin/estadisticas/estadisticas.component';
import { StatsEmpleadosComponent } from './components/admin/estadisticas/stats-empleados/stats-empleados.component';
import { StatsPedidosComponent } from './components/admin/estadisticas/stats-pedidos/stats-pedidos.component';
import { StatsMesasComponent } from './components/admin/estadisticas/stats-mesas/stats-mesas.component';
import { EncuestaComponent } from './components/usuario/encuesta/encuesta.component';
import { ComentariosComponent } from './components/admin/comentarios/comentarios.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: '#', component: ErrorComponent },
{ path: 'error', component: ErrorComponent },
{ path: 'login', component: LoginComponent },
{ path: 'registrar', component: RegistrarComponent },
{
  path: 'Admin', component: AdminComponent,
  canActivate: [AuthGuardService],
  data: { expectedType: 3 },
  children: [
    { path: 'ListEmpleados', component: EmpListComponent },
    { path: 'Pedidos', component: ListadopedidosComponent },
    { path: 'Mesas', component: MesasComponent },
    {
      path: 'Estadisticas', component: EstadisticasComponent,
      children: [
        { path: 'Empleados', component: StatsEmpleadosComponent },
        { path: 'Platos', component: StatsPedidosComponent },
        { path: 'Mesas', component: StatsMesasComponent },
        { path: 'Comentarios', component: ComentariosComponent }]
    }
  ]
},
{
  path: 'Empleado', component: EmpleadoComponent,
  canActivate: [AuthGuardService],
  data: { expectedType: 2 },
  children: [
    {
      path: 'Mozo', component: MozoComponent,
      canActivate: [AuthGuardService],
      data: { expectedRole: 4 },
      children: [
        { path: 'NuevaComanda', component: ComandaComponent },
        { path: 'Mesas', component: MesasComponent },
      ]
    },
    { path: 'PedidosLive', component: ListadopedidosComponent },
  ]
},
{
  path: 'Cliente', component: UsuarioComponent,
  canActivate: [AuthGuardService],
  data: { expectedType: 1 },
  children: [
    { path: 'BuscarPedido', component: BuscarpedidoComponent },
    { path: 'Encuesta', component: EncuestaComponent }
  ]
},
{
  path: 'Perfil', component: PerfilComponent,
  canActivate: [AuthGuardService]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
