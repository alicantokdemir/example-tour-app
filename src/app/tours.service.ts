import { Injectable, EventEmitter } from '@angular/core';
import { TourListItem, TourListWaypoint } from '../models/models';
import { TOURS } from '../data/data';
import { UtilsService } from './utils.service';

@Injectable()
export class ToursService {

  constructor(private _utils: UtilsService) {
  }

  getTours(id?: string | number): Promise<TourListItem | TourListItem[]> {
    if (id) {
      const foundTour = this._utils.findById(id, TOURS);

      if (foundTour) {
        return Promise.resolve(this._utils.copyObj(foundTour));
      } else {
        return Promise.reject("Tour not found!");
      }
    }
    const copyTours = this._utils.copyObj(TOURS);
    return Promise.resolve(copyTours);
  }

  updateTour(id: string | number, updatedTour: TourListItem): Promise<TourListItem> {
    const foundTour = this._utils.findById(id, TOURS);

    if (foundTour) {
      Object.assign(foundTour, updatedTour);
      return Promise.resolve(this._utils.copyObj(foundTour));
    } else {
      return Promise.reject("Tour not found!");
    }
  }

  removeTour(id: string | number): Promise<string> {
    if (!confirm("Are you sure to remove this tour?")) {
      return;
    }

    const foundTour = this._utils.findById(id, TOURS);

    if (foundTour) {
      TOURS.splice(TOURS.indexOf(foundTour), 1);
      return Promise.resolve("Deleted successfully");
    } else {
      return Promise.reject("Tour not found!");
    }
  }

}
