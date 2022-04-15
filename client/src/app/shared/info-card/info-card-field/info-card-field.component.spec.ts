import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCardFieldComponent } from './info-card-field.component';

describe('InfoCardFieldComponent', () => {
  let component: InfoCardFieldComponent;
  let fixture: ComponentFixture<InfoCardFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCardFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCardFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
