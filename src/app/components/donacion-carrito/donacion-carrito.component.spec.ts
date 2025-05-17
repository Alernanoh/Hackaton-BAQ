import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonacionCarritoComponent } from './donacion-carrito.component';

describe('DonacionCarritoComponent', () => {
  let component: DonacionCarritoComponent;
  let fixture: ComponentFixture<DonacionCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonacionCarritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonacionCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
