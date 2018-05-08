import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCofluencerComponent } from './select-cofluencer.component';

describe('SelectCofluencerComponent', () => {
  let component: SelectCofluencerComponent;
  let fixture: ComponentFixture<SelectCofluencerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCofluencerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCofluencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
