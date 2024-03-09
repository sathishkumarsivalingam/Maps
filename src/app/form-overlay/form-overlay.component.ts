import { Component, Output, EventEmitter } from '@angular/core';
import { MapModel } from '../models/map.model';
import { MapServices } from '../services/map.services';

@Component({
  selector: 'app-form-overlay',
  templateUrl: './form-overlay.component.html',
  styleUrls: ['./form-overlay.component.css']
})
export class FormOverlayComponent {
  latitude!: number;
  longitude!: number;

  cordinateModel: MapModel = {
    latitude: 0,
    longitude: 0
  }
  constructor(private mapService: MapServices) {

  }
  addMarkers() {
    if (this.mapService.isValidCoordinate(this.latitude) && this.mapService.isValidCoordinate(this.longitude)) {
      this.cordinateModel.latitude = this.latitude;
      this.cordinateModel.longitude = this.longitude;
      this.mapService.addMarker(this.cordinateModel);
    } else {
      alert('Please enter valid coordinates');
    }
  }
  onClear(){
    this.mapService.removeMarker();
  }
}
