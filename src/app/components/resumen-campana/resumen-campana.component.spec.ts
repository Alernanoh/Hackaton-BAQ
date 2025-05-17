import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenCampanaComponent } from './resumen-campana.component';

describe('ResumenCampanaComponent', () => {
  let component: ResumenCampanaComponent;
  let fixture: ComponentFixture<ResumenCampanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenCampanaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenCampanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
