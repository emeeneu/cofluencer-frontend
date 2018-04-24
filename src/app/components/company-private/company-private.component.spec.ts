import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPrivateComponent } from './company-private.component';

describe('CompanyPrivateComponent', () => {
  let component: CompanyPrivateComponent;
  let fixture: ComponentFixture<CompanyPrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyPrivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
