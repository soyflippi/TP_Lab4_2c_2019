import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadopedidosComponent } from './listadopedidos.component';

describe('ListadopedidosComponent', () => {
  let component: ListadopedidosComponent;
  let fixture: ComponentFixture<ListadopedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadopedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadopedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
