import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionmodalComponent } from './calificacionmodal.component';

describe('CalificacionmodalComponent', () => {
  let component: CalificacionmodalComponent;
  let fixture: ComponentFixture<CalificacionmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalificacionmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalificacionmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
