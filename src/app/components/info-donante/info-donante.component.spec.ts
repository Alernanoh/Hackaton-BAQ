import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDonanteComponent } from './info-donante.component';

describe('InfoDonanteComponent', () => {
  let component: InfoDonanteComponent;
  let fixture: ComponentFixture<InfoDonanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoDonanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDonanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
