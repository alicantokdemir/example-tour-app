import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { UtilsService } from '../utils.service';
import { WaypointsService } from '../waypoints.service';
import { TourListWaypoint } from '../../models/models';

@Component({
  selector: 'waypoint-list',
  templateUrl: './waypoint-list.component.html',
  styleUrls: ['./waypoint-list.component.less']
})
export class WaypointListComponent implements OnInit {

  trackPosition: boolean = false;

  @Output() onDragEndChange: EventEmitter<{ el: ElementRef, waypoint: TourListWaypoint }> = new EventEmitter();

  @Input() waypoints: TourListWaypoint[] = [];

  onDragEnd(el, waypoint) {
    this.onDragEndChange.emit({ el, waypoint });
  }

  constructor(public utils: UtilsService, private _waypointsService: WaypointsService) { }

  ngOnInit() {
  }

}
