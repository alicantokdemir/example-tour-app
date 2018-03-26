import { TestBed, inject } from '@angular/core/testing';

import { WaypointsService } from './waypoints.service';

describe('WaypointsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WaypointsService]
    });
  });

  it('should be created', inject([WaypointsService], (service: WaypointsService) => {
    expect(service).toBeTruthy();
  }));
});
