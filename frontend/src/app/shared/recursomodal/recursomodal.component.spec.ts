import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursomodalComponent } from './recursomodal.component';

describe('RecursomodalComponent', () => {
  let component: RecursomodalComponent;
  let fixture: ComponentFixture<RecursomodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursomodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecursomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
