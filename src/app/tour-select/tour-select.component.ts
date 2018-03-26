import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TourListItem } from '../../models/tour-list-item';
import { UtilsService } from '../utils.service';
import { ToursService } from '../tours.service';

@Component({
  selector: 'tour-select',
  templateUrl: './tour-select.component.html',
  styleUrls: ['./tour-select.component.less']
})
export class TourSelectComponent implements OnInit {

  @Input() tours: TourListItem[] = [];
  @Input() selectedTour: TourListItem;
  @Output() selectedTourChange: EventEmitter<TourListItem> = new EventEmitter();

  onSelectedTourChange(sTour: TourListItem) {
    this.selectedTour = sTour;
    this.selectedTourChange.emit(sTour);
  }

  constructor(public utils: UtilsService) { }

  ngOnInit() {
  }
}
