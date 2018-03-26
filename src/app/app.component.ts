import { Component } from '@angular/core';
import { UtilsService } from './utils.service';
import { ToursService } from './tours.service';
import { TourListItem, TourListWaypoint } from '../models/models';
import { WaypointsService } from './waypoints.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  selectedTour: TourListItem;

  waypoints: TourListWaypoint[];

  tours: TourListItem[] = [];

  constructor(private _toursService: ToursService, public waypointsService: WaypointsService, private _utils: UtilsService) {
  }

  onDragEnd({ el, waypoint }: { el: HTMLElement, waypoint: TourListWaypoint }) {
    let rect1 = el.getBoundingClientRect();
    let rect2 = document.getElementById('tour-details').getBoundingClientRect();

    let overlap = !(rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom);

    if (overlap && !this._utils.findById(waypoint.id, this.selectedTour.waypoints)) {
      this.selectedTour.waypoints = [...this.selectedTour.waypoints, waypoint];
    }

  }

  init() {
    Promise.all([this.waypointsService.getWaypoints(), this._toursService.getTours()])
      .then((res: [TourListWaypoint[], TourListItem[]]) => {
        this.waypoints = res[0];
        this.tours = res[1];
        if (!this.selectedTour) {
          this.selectedTour = this.tours[0];
        }
      });
  }

  ngOnInit() {
    this.init();
  }
}
