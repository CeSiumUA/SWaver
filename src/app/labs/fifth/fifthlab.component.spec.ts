import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthlabComponent } from './fifthlab.component';

describe('FifthlabComponent', () => {
  let component: FifthlabComponent;
  let fixture: ComponentFixture<FifthlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FifthlabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FifthlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
