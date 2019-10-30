import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  
  DataComentariosBuenos: any;
  DataComentariosMalos: any;
  mostrarBuenos: Boolean;
  mostrarMalos: Boolean;

  constructor(public adminServ: AdminService) {
    this.mostrarBuenos = false;
    this.mostrarMalos = false;
   }

  ngOnInit() {
    this.diezBuenosCommentRND();
    this.diezMalosCommentRND();

  }

  public veinteRnd()
  {
    this.DataComentariosBuenos = null;
    this.DataComentariosMalos = null;
    this.diezBuenosCommentRND();
    this.diezMalosCommentRND();
  }

  private diezBuenosCommentRND()
  {
    this.adminServ.BuenosComentarios()
    .then( data => {
      console.log(data);
      if(data.length !== 0)
      {
        this.DataComentariosBuenos = data;
        this.mostrarBuenos = true;
      }
      else
      {
        throwError('erro no hay comentarios');
      }
    })
    .catch( error => {console.log(error); });
  }

  private diezMalosCommentRND()
  {
    this.adminServ.MalosComentarios()
    .then( data => {
      console.log(data);
      if(data.length !== 0)
      {
        this.DataComentariosMalos = data;
        this.mostrarMalos = true;
      }
      else
      {
        throwError('erro no hay comentarios');
      }
    })
    .catch( error => {console.log(error); });
  }

}
