import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarpedidoComponent } from './buscarpedido.component';

describe('BuscarpedidoComponent', () => {
  let component: BuscarpedidoComponent;
  let fixture: ComponentFixture<BuscarpedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarpedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarpedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
