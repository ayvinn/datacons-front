import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesousequipementComponent } from './updatesousequipement.component';

describe('UpdatesousequipementComponent', () => {
  let component: UpdatesousequipementComponent;
  let fixture: ComponentFixture<UpdatesousequipementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatesousequipementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesousequipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
