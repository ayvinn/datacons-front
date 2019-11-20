import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateintervenantsconsComponent } from './updateintervenantscons.component';

describe('UpdateintervenantsconsComponent', () => {
  let component: UpdateintervenantsconsComponent;
  let fixture: ComponentFixture<UpdateintervenantsconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateintervenantsconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateintervenantsconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
