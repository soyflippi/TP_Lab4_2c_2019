import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CargandoService } from 'src/app/services/cargando.service';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.scss']
})
export class CargandoComponent implements OnInit {
  isLoading: Subject<boolean> = this.cargandoService.isLoading;
  constructor(public cargandoService: CargandoService) { }

  ngOnInit() {
  }
}
