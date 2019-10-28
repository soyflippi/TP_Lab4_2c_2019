import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MozoComponent } from './mozo.component';

describe('MozoComponent', () => {
  let component: MozoComponent;
  let fixture: ComponentFixture<MozoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MozoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MozoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
