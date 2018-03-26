import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourMapsComponent } from './tour-maps.component';

describe('TourMapsComponent', () => {
  let component: TourMapsComponent;
  let fixture: ComponentFixture<TourMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
