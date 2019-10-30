import { Component, OnInit, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Usuario } from 'src/app/classes/usuario';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {


  nuevoUsuario: Usuario;
  nombre: string;
  apellido: string;
  usuario: string;
  pass: string;
  passDos: string;
  formRegistrar: FormGroup;
  nombreCtrl: FormControl;
  apellidoCtrl: FormControl;
  usuarioCtrl: FormControl;
  passCtrl: FormControl;
  passDosCtrl: FormControl;


  constructor(private miContructor: FormBuilder, private router: Router, private registrarServ: UsuariosService) {
    this.nuevoUsuario = new Usuario();
  }


  ngOnInit() {
    this.nombreCtrl = new FormControl('', [Validators.pattern('[a-zA-Z ]*'), Validators.required, Validators.minLength(3)]);
    this.apellidoCtrl = new FormControl('', [Validators.pattern('[a-zA-Z ]*'), Validators.required,
     Validators.minLength(3), Validators.maxLength(50)]);
    this.usuarioCtrl =  new FormControl('', [Validators.pattern('[a-zA-Z0-9-]+'), Validators.required,
     Validators.minLength(3), Validators.maxLength(15)]);
    this.passCtrl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]);
    this.passDosCtrl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]);
    this.formRegistrar = this.miContructor.group({
      nombre: this.nombreCtrl,
      apellido: this.apellidoCtrl,
      usuario:  this.usuarioCtrl,
      pass:   this.passCtrl,
      passDos: this.passDosCtrl,
    });
  }

  get name() {
    return this.formRegistrar.get('nombre') as FormControl;
  }
  get surname() {
    return this.formRegistrar.get('apellido') as FormControl;
  }
  get user() {
    return this.formRegistrar.get('usuario') as FormControl;
  }

  get pass1() {
    return this.formRegistrar.get('pass') as FormControl;
  }

  get pass2() {
    return this.formRegistrar.get('passDos') as FormControl;
  }

  

  public GuardarNuevoUsuario() {
    this.nuevoUsuario.nombre = this.formRegistrar.get('nombre').value;
    this.nuevoUsuario.apellido = this.formRegistrar.get('apellido').value;
    this.nuevoUsuario.user = this.formRegistrar.get('usuario').value;
    this.nuevoUsuario.pass = this.formRegistrar.get('pass').value;
    this.nuevoUsuario.tipo_usuario = 1;
    this.nuevoUsuario.estado = 1;

    this.registrarServ.AltaUsuarios(this.nuevoUsuario).then(data => {
      if (data) {
        console.log(data);
        this.router.navigate(['/login']);

        }
      })
        .catch( err => {
          console.error(err);
        });
    }





}
