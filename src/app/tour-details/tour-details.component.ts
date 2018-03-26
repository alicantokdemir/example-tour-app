import { Component, OnInit, Input } from '@angular/core';
import { TourListItem, TourDriver, TourListWaypoint } from '../../models/models';
import { ToursService } from '../tours.service';
import { UtilsService } from '../utils.service';
import { DRIVERS } from '../../data/data';

@Component({
  selector: 'tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.less']
})
export class TourDetailsComponent implements OnInit {
  @Input() tour: TourListItem;

  drivers: TourDriver[] = DRIVERS;

  removeWaypoint(point: TourListWaypoint) {
    this.tour.waypoints.splice(this.tour.waypoints.indexOf(point), 1);
    this.tour.waypoints = [...this.tour.waypoints];
  }

  constructor(public toursService: ToursService, public utils: UtilsService) { }

  ngOnInit() {
  }

}
