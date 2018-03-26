import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularDraggableModule } from 'angular2-draggable';

import { AppComponent } from './app.component';
import { TourMapsComponent } from './tour-maps/tour-maps.component';
import { TourSelectComponent } from './tour-select/tour-select.component';

import { UtilsService } from './utils.service';
import { ToursService } from './tours.service';
import { WaypointsService } from './waypoints.service';

import { TourDetailsComponent } from './tour-details/tour-details.component';
import { WaypointListComponent } from './waypoint-list/waypoint-list.component';
import { DriverListComponent } from './driver-list/driver-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TourMapsComponent,
    TourSelectComponent,
    TourDetailsComponent,
    WaypointListComponent,
    DriverListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularDraggableModule
  ],
  providers: [UtilsService, ToursService, WaypointsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
