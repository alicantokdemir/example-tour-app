import { Component, OnInit, ViewChild, Query, ElementRef, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { TourListWaypoint, TourListItem } from '../../models/models';
import { } from '@types/googlemaps';
import { WaypointsService } from '../waypoints.service';

@Component({
  selector: 'tour-maps',
  templateUrl: './tour-maps.component.html',
  styleUrls: ['./tour-maps.component.less']
})
export class TourMapsComponent implements OnInit, OnChanges {

  @ViewChild('gmap') gmapElement: ElementRef;
  @Input() allWaypoints: TourListWaypoint[] = [];
  @Input() activeWaypoints: TourListWaypoint[] = [];
  private _map: google.maps.Map;
  private _markers: google.maps.Marker[] = [];
  private _infoWindows: google.maps.InfoWindow[] = [];
  private _placeService: google.maps.places.PlacesService;

  constructor(private _waypointService: WaypointsService) { }

  addMarker(name, lat, lng, markerColor?: string, animation?: boolean) {
    let icon = {
      url: `http://maps.google.com/mapfiles/ms/icons/${markerColor ? markerColor : "green"}-dot.png`,
      size: new google.maps.Size(30, 30),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(10, 30)
    };

    var contentString = `
    <div id="content">
      <span class="text-center">${name}</span>
    </div>`;

    let infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    let marker = new google.maps.Marker({
      position: { lat, lng },
      map: this._map,
      draggable: false,
      animation: animation ? google.maps.Animation.DROP : null,
      icon: icon,
      title: name
    });

    marker.addListener('click', () => {
      this._infoWindows.forEach((infoWindow: google.maps.InfoWindow) => {
        infoWindow.close();
      });
      infoWindow.open(this._map, marker);
    });

    this._markers.push(marker);
    this._infoWindows.push(infoWindow);
  }

  removeMarkers() {
    this._markers.forEach((marker: google.maps.Marker) => {
      marker.setMap(null);
    });
    this._markers.length = 0;
  }

  addWaypoints(allWaypoints: TourListWaypoint[] = [], activeWaypoints: TourListWaypoint[] = [], animation?: boolean) {
    allWaypoints.forEach((waypoint: TourListWaypoint) => {
      let isActive: boolean = activeWaypoints ? activeWaypoints.some((aw: TourListWaypoint) => aw.id == waypoint.id) : false;
      if (isActive) {
        this.addMarker(waypoint.name, waypoint.latlng[0], waypoint.latlng[1], 'green', animation);
      } else {
        this.addMarker(waypoint.name, waypoint.latlng[0], waypoint.latlng[1], 'red', animation);
      }
    });
  }

  ngOnInit() {
    const mapOptions = {
      center: new google.maps.LatLng(-3.7319, -38.5267),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this._map = new google.maps.Map(this.gmapElement.nativeElement, mapOptions);

    this._placeService = new google.maps.places.PlacesService(this._map);

    this._map.addListener('click', (e) => {
      let waypointTempName: string = 'new waypoint';

      let addWaypoint: () => void = () => {
        this.addMarker(waypointTempName, e.latLng.lat(), e.latLng.lng(), 'red');
        let newWaypoint: TourListWaypoint = {
          id: 0,
          latlng: [e.latLng.lat(), e.latLng.lng()],
          name: waypointTempName,
        };
        this._waypointService.createWaypoint(newWaypoint);
      };

      if (e.placeId) {
        this._placeService.getDetails({
          placeId: e.placeId
        }, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            waypointTempName = place.name;
            addWaypoint();
          }
        });
      } else {
        addWaypoint();
      }
    });

    if (this.allWaypoints) {
      this.addWaypoints(this.allWaypoints, this.activeWaypoints, true);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    let allWaypoints: TourListWaypoint[] = changes['allWaypoints'] ? changes['allWaypoints'].currentValue : this.allWaypoints;
    let activeWaypoints: TourListWaypoint[] = changes['activeWaypoints'] ? changes['activeWaypoints'].currentValue : this.activeWaypoints;
    this.removeMarkers();
    this.addWaypoints(allWaypoints, activeWaypoints);
  }
}
