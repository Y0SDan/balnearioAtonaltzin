import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservacionUsuarioComponent } from './reservacion-usuario.component';

describe('ReservacionUsuarioComponent', () => {
  let component: ReservacionUsuarioComponent;
  let fixture: ComponentFixture<ReservacionUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservacionUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservacionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
