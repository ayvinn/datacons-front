import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateinterventionComponent } from './updateintervention.component';

describe('UpdateinterventionComponent', () => {
  let component: UpdateinterventionComponent;
  let fixture: ComponentFixture<UpdateinterventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateinterventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateinterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
