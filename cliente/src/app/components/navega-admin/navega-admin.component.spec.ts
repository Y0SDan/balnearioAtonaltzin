import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegaAdminComponent } from './navega-admin.component';

describe('NavegaAdminComponent', () => {
  let component: NavegaAdminComponent;
  let fixture: ComponentFixture<NavegaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavegaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
