import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeconsignationComponent } from './deconsignation.component';

describe('DeconsignationComponent', () => {
  let component: DeconsignationComponent;
  let fixture: ComponentFixture<DeconsignationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeconsignationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeconsignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
