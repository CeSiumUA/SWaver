import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdlabComponent } from './thirdlab.component';

describe('ThirdlabComponent', () => {
  let component: ThirdlabComponent;
  let fixture: ComponentFixture<ThirdlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdlabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
