import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservacionAdminComponent } from './reservacion-admin.component';

describe('ReservacionAdminComponent', () => {
  let component: ReservacionAdminComponent;
  let fixture: ComponentFixture<ReservacionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservacionAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservacionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
