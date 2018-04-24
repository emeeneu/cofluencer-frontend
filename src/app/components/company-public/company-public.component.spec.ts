import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPublicComponent } from './company-public.component';

describe('CompanyPublicComponent', () => {
  let component: CompanyPublicComponent;
  let fixture: ComponentFixture<CompanyPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
