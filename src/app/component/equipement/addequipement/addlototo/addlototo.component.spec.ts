import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlototoComponent } from './addlototo.component';

describe('AddlototoComponent', () => {
  let component: AddlototoComponent;
  let fixture: ComponentFixture<AddlototoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlototoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlototoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
