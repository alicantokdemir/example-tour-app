import { Injectable, NgZone } from '@angular/core';
import { TourListWaypoint } from '../models/models';
import { WAYPOINTS } from '../data/data';
import { UtilsService } from './utils.service';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WaypointsService {

  private _waypoints: BehaviorSubject<TourListWaypoint[]> = new BehaviorSubject(WAYPOINTS);
  public readonly waypoints$: Observable<TourListWaypoint[]> = this._waypoints.asObservable();

  constructor(private _utils: UtilsService, private ngZone: NgZone) {
  }

  getWaypoints(id?: string | number): Promise<TourListWaypoint | TourListWaypoint[]> {
    if (id) {
      const foundWaypoint = this._utils.findById(id, this._waypoints.getValue());

      if (foundWaypoint) {
        return Promise.resolve(this._utils.copyObj(foundWaypoint));
      } else {
        return Promise.reject("Waypoint not found!");
      }
    }
    const copyWaypoints = this._utils.copyObj(this._waypoints.getValue());
    return Promise.resolve(copyWaypoints);
  }

  createWaypoint(waypoint: TourListWaypoint): Promise<TourListWaypoint> {
    waypoint.id = this._waypoints.getValue().length + 1;
    let oldWaypoints = this._waypoints.getValue();
    this.ngZone.run(() => this._waypoints.next([...oldWaypoints, waypoint]));
    return Promise.resolve(this._utils.copyObj(waypoint));
  }

  updateWaypoint(id: string | number, updatedWaypoint: TourListWaypoint): Promise<TourListWaypoint> {
    const foundWaypoint = this._utils.findById(id, this._waypoints.getValue());

    if (foundWaypoint) {
      Object.assign(foundWaypoint, updatedWaypoint);
      return Promise.resolve(this._utils.copyObj(foundWaypoint));
    } else {
      return Promise.reject("Waypoint not found!");
    }
  }

  removeWaypoint(id: string | number): Promise<string> {
    if (!confirm("Are you sure to remove this waypoint?")) {
      return;
    }

    const foundWaypoint = this._utils.findById(id, this._waypoints.getValue());

    if (foundWaypoint) {
      this._waypoints.getValue().splice(this._waypoints.getValue().indexOf(foundWaypoint), 1);
      console.log('new waypoints => ', this._waypoints.getValue())
      this.ngZone.run(() => this._waypoints.next(this._waypoints.getValue()));
      return Promise.resolve("Deleted successfully");
    } else {
      return Promise.reject("Waypoint not found!");
    }
  }

}
