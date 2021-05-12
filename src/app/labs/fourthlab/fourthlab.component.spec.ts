import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthlabComponent } from './fourthlab.component';

describe('FourthlabComponent', () => {
  let component: FourthlabComponent;
  let fixture: ComponentFixture<FourthlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourthlabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourthlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
