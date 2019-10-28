import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SousequipementComponent } from './sousequipement.component';

describe('SousequipementComponent', () => {
  let component: SousequipementComponent;
  let fixture: ComponentFixture<SousequipementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SousequipementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SousequipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
