import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsEmpleadosComponent } from './stats-empleados.component';

describe('StatsEmpleadosComponent', () => {
  let component: StatsEmpleadosComponent;
  let fixture: ComponentFixture<StatsEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
