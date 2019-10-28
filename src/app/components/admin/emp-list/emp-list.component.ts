import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/clases/usuario';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { AdminService } from 'src/app/servicios/admin.service';
import {rolPipe} from '../../../pipes/rol.pipe';
import {MatSnackBar} from '@angular/material';

export interface UserData {
  cod_emp: number;
  nombre: string;
  apellido: string;
  usuario: string;
  estado: number;
  rol: string;
}


@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {

  rol = [
    {id: 1, name: 'Socio'},
    {id: 2, name: 'Mozo'},
    {id: 3, name: 'Cervecero'},
    {id: 4, name: 'Cocinero'},
    {id: 5, name: 'Bartender'},
    {id: 6, name: 'Repostero'}

  ];

  
  datosUsuarios: UserData[];
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
  rolCntrl: FormControl;
  passCtrl: FormControl;
  passDosCtrl: FormControl;

  displayedColumns: string[] = ['codemp', 'nombre', 'apellido', 'usuario', 'estado', 'rol', 'eliminar', 'suspender'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private miContructor: FormBuilder, private router: Router, private adminServ: AdminService, public snackBar: MatSnackBar) {

    this.dataSource = new MatTableDataSource;

    this.adminServ.traerEmpleados().subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
    });

    // Assign the data to the data source for the table to render
    this.nuevoUsuario = new Usuario;
  }

  ngOnInit() {
    this.nombreCtrl = new FormControl('', [Validators.pattern('[a-zA-Z ]*'), Validators.required, Validators.minLength(3)]);
    this.apellidoCtrl = new FormControl('', [Validators.pattern('[a-zA-Z ]*'), Validators.required,
    Validators.minLength(3), Validators.maxLength(50)]);
    this.usuarioCtrl =  new FormControl('', [Validators.pattern('[a-zA-Z0-9-]+'), Validators.required,
     Validators.minLength(3), Validators.maxLength(15)]);
    this.passCtrl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]);
    this.passDosCtrl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]);
    this.rolCntrl = new FormControl('', [Validators.required]);
    this.formRegistrar = this.miContructor.group({
      nombre: this.nombreCtrl,
      apellido: this.apellidoCtrl,
      usuario:  this.usuarioCtrl,
      pass:   this.passCtrl,
      passDos: this.passDosCtrl,
      rol: this.rolCntrl
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

    public GuardarNuevoUsuario() {
      const pipeRol = new rolPipe();
    this.nuevoUsuario.nombre = this.formRegistrar.get('nombre').value;
    this.nuevoUsuario.apellido = this.formRegistrar.get('apellido').value;
    this.nuevoUsuario.user = this.formRegistrar.get('usuario').value;
    this.nuevoUsuario.pass = this.formRegistrar.get('pass').value;
    this.nuevoUsuario.tipo_usuario = 2;
    this.nuevoUsuario.rol  = pipeRol.transform(this.formRegistrar.get('rol').value);
    this.nuevoUsuario.estado = 1;

    console.log(this.nuevoUsuario);
    this.adminServ.AltaEmpleados(this.nuevoUsuario).then(data => {
      if (data) {
        this.reload();
        this.openSnackBar('Empleado guardado correctamente', 'OK');
      }
    })
    .catch(error => {console.log(error); });


  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  Suspender(codigoemp: number) {
    let user = {cod_emp: codigoemp};
    this.adminServ.SuspenderEmp(user);
    this.dataSource.data = [];
    this.reload();
    this.openSnackBar('Empleado suspendido. Recargue lista.', 'OK');
  }

  Reincorporar(codigoemp: number) {
    let user = {cod_emp: codigoemp};
    this.adminServ.ReincorporarEmp(user);
    this.dataSource.data = [];
    this.reload();
    this.openSnackBar('Empleado reincoporado. Recargue lista.', 'OK');
  }

  Eliminar(codigoemp: number) {
    let user = {cod_emp: codigoemp};
    this.adminServ.BajaLogica(user);
    this.dataSource.data = [];
    this.reload();
    this.openSnackBar('Empleado eliminado. Recargue lista.', 'OK');
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

  reload()
  {
    this.adminServ.traerEmpleados().subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
    });
  }
}





