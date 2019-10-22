import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddemandeurComponent } from './adddemandeur.component';

describe('AdddemandeurComponent', () => {
  let component: AdddemandeurComponent;
  let fixture: ComponentFixture<AdddemandeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddemandeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddemandeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
