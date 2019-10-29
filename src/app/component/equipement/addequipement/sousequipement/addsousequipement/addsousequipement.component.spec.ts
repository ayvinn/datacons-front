import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsousequipementComponent } from './addsousequipement.component';

describe('AddsousequipementComponent', () => {
  let component: AddsousequipementComponent;
  let fixture: ComponentFixture<AddsousequipementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsousequipementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsousequipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
