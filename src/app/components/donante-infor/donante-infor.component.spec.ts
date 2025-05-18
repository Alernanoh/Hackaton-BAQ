import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonanteInforComponent } from './donante-infor.component';

describe('DonanteInforComponent', () => {
  let component: DonanteInforComponent;
  let fixture: ComponentFixture<DonanteInforComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonanteInforComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonanteInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
