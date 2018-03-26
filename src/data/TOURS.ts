import { DRIVERS } from './DRIVERS';
import { WAYPOINTS } from './WAYPOINTS';

export const TOURS = [
  {
    id: 1,
    name: 'Awesome tour',
    description: 'thats a cool tour!',
    driver: DRIVERS[0],
    waypoints: WAYPOINTS.slice(0, 3)
  },
  {
    id: 2,
    name: 'test2',
    description: 'thats a cool tour2!',
    driver: DRIVERS[1],
    waypoints: WAYPOINTS.slice(3)
  },
];