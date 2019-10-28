import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsPedidosComponent } from './stats-pedidos.component';

describe('StatsPedidosComponent', () => {
  let component: StatsPedidosComponent;
  let fixture: ComponentFixture<StatsPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
