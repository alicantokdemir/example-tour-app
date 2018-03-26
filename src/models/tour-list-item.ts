import { TourDriver } from './tour-driver';
import { TourListWaypoint } from './tour-list-waypoint';

export interface TourListItem {
  id: number;
  name: string;
  description: string;
  driver: TourDriver;
  waypoints: TourListWaypoint[]
}
