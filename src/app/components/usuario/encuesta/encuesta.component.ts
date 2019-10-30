import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/classes/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  mesaEncuesta: number;
  mostrarEncuesta: Boolean;
  mostrarSuccesEncuesta: Boolean;
  mostrarSinEncuesta: Boolean;
  encuestaPendiente: any;
  formEncuesta: FormGroup;
  mesaScore: number;
  mozoScore: number;
  restScore: number;
  comidaScore: number;
  texto: string;
  mesaScoreCtrl: FormControl;
  mozoScoreCtrl: FormControl;
  restScoreCtrl: FormControl;
  comidaScoreCtrl: FormControl;
  textoCtrl: FormControl;

  constructor(public miContructor: FormBuilder, private usuarioServ: UsuariosService, private authSv: AuthService) {
    this.mostrarEncuesta = false;
    this.mostrarSuccesEncuesta = false;
    this.mostrarSinEncuesta = false;
   }

  ngOnInit() {
    this.verificarEncuestaPendiente();

    this.mesaScoreCtrl = new FormControl('', [Validators.required]);
    this.mozoScoreCtrl = new FormControl('', [Validators.required]);
    this.restScoreCtrl = new FormControl('', [Validators.required]);
    this.comidaScoreCtrl = new FormControl('', [Validators.required]);
    this.textoCtrl = new FormControl('', [Validators.pattern('[a-zA-Z ]*'), Validators.required, Validators.minLength(15)]);

    this.formEncuesta = this.miContructor.group({
      mesaScore: this.mesaScoreCtrl,
      mozoScore: this.mozoScoreCtrl,
      restScore:  this.restScoreCtrl,
      comidaScore:   this.comidaScoreCtrl,
      texto:   this.textoCtrl
    });
  }

  get mesa() {
    return this.formEncuesta.get('mesaScore') as FormControl;
  }
  get mozo() {
    return this.formEncuesta.get('mozoScore') as FormControl;
  }
  get resto() {
    return this.formEncuesta.get('restScore') as FormControl;
  }
  get comida() {
    return this.formEncuesta.get('comidaScore') as FormControl;
  }

  public GuardarNuevaEncuesta() {
    const respuestasEncuesta = {
      mesa: this.formEncuesta.get('mesaScore').value,
      mozo: this.formEncuesta.get('mozoScore').value,
      resto: this.formEncuesta.get('restScore').value,
      comida: this.formEncuesta.get('comidaScore').value,
      texto: this.formEncuesta.get('texto').value,
      nro_mesa: this.mesaEncuesta,
      usuario: this.authSv.getUser()
    };

    this.usuarioServ.guardarEncuesta(respuestasEncuesta)
    .then( data => {
      if (data['respuesta'] === true) {
        this.mostrarSuccesEncuesta = true;
        this.mostrarEncuesta = false;
      }
    })
    .catch( error => {console.log(error); });

  }

  public verificarEncuestaPendiente() {
    this.usuarioServ.BuscarEncuestasPendientes(this.authSv.getUser())
    .then( data => {
      console.log(data.length);
      if (data.length !== 0) {
        this.mesaEncuesta = data[0].mesa;
        this.mostrarEncuesta = true;
      } else {
        this.mostrarSinEncuesta = true;
      }
    })
    .catch(error => {console.log(error); });
  }

}
