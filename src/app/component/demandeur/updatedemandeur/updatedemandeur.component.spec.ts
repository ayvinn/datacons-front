import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedemandeurComponent } from './updatedemandeur.component';

describe('UpdatedemandeurComponent', () => {
  let component: UpdatedemandeurComponent;
  let fixture: ComponentFixture<UpdatedemandeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedemandeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedemandeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
