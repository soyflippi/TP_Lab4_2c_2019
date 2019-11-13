import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  perfil = {};
  constructor(public usuariosService: UsuariosService, public authService: AuthService) { }

  ngOnInit() {
    this.obtenerPerfil();
  }

  obtenerPerfil(){
    this.usuariosService.obtenerPerfil({ cod_emp: this.authService.getUser() })
    .then(resp => {
      if(resp.length > 0)this.perfil = resp[0];
    });
  }

}
