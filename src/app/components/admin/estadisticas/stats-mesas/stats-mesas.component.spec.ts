import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsMesasComponent } from './stats-mesas.component';

describe('StatsMesasComponent', () => {
  let component: StatsMesasComponent;
  let fixture: ComponentFixture<StatsMesasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsMesasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
