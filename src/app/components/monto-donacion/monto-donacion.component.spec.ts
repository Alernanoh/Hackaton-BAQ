import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontoDonacionComponent } from './monto-donacion.component';

describe('MontoDonacionComponent', () => {
  let component: MontoDonacionComponent;
  let fixture: ComponentFixture<MontoDonacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MontoDonacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MontoDonacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
