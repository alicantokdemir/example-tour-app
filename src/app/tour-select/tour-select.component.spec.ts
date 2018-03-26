import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourSelectComponent } from './tour-select.component';

describe('TourSelectComponent', () => {
  let component: TourSelectComponent;
  let fixture: ComponentFixture<TourSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
