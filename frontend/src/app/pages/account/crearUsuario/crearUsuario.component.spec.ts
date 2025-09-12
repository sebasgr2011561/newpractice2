import { ComponentFixture, TestBed } from '@angular/core/testing';

import { crearUsuarioComponent } from './crearUsuario.component';

describe('crearUsuarioComponent', () => {
  let component: crearUsuarioComponent;
  let fixture: ComponentFixture<crearUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ crearUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(crearUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
