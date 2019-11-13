import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LototoComponent } from './lototo.component';

describe('LototoComponent', () => {
  let component: LototoComponent;
  let fixture: ComponentFixture<LototoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LototoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LototoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
