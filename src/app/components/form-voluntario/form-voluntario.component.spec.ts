import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVoluntarioComponent } from './form-voluntario.component';

describe('FormVoluntarioComponent', () => {
  let component: FormVoluntarioComponent;
  let fixture: ComponentFixture<FormVoluntarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormVoluntarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
