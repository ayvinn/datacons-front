import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesecteurComponent } from './updatesecteur.component';

describe('UpdatesecteurComponent', () => {
  let component: UpdatesecteurComponent;
  let fixture: ComponentFixture<UpdatesecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatesecteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
