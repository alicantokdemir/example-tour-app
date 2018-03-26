import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UtilsService } from '../utils.service';
import { TourDriver } from '../../models/models';
import { DRIVERS } from '../../data/data';

@Component({
  selector: 'driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.less']
})
export class DriverListComponent implements OnInit {

  drivers: TourDriver[] = DRIVERS;

  @Input() selectedDriver: TourDriver;
  @Output() selectedDriverChange: EventEmitter<TourDriver> = new EventEmitter();

  onSelectedDriverChange(newDriver: TourDriver) {
    this.selectedDriver = newDriver;
    this.selectedDriverChange.emit(newDriver);
  }

  constructor(public utils: UtilsService) { }

  ngOnInit() {
  }

}
