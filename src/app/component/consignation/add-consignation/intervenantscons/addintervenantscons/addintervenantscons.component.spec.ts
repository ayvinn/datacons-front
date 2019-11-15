import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddintervenantsconsComponent } from './addintervenantscons.component';

describe('AddintervenantsconsComponent', () => {
  let component: AddintervenantsconsComponent;
  let fixture: ComponentFixture<AddintervenantsconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddintervenantsconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddintervenantsconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
