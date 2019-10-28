import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpProductoresComponent } from './emp-productores.component';

describe('EmpProductoresComponent', () => {
  let component: EmpProductoresComponent;
  let fixture: ComponentFixture<EmpProductoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpProductoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpProductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
