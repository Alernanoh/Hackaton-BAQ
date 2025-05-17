import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonaPropositoComponent } from './dona-proposito.component';

describe('DonaPropositoComponent', () => {
  let component: DonaPropositoComponent;
  let fixture: ComponentFixture<DonaPropositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonaPropositoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonaPropositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
