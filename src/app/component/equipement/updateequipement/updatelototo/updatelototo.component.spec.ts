import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatelototoComponent } from './updatelototo.component';

describe('UpdatelototoComponent', () => {
  let component: UpdatelototoComponent;
  let fixture: ComponentFixture<UpdatelototoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatelototoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatelototoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
