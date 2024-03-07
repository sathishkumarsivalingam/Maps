import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-overlay',
  templateUrl: './form-overlay.component.html',
  styleUrls: ['./form-overlay.component.css']
})
export class FormOverlayComponent {
  latitude!: number;
  longitude!: number;

  @Output() addMarkerEvent = new EventEmitter<{ latitude: number, longitude: number }>();

  addMarker() {
    // Validate latitude and longitude
    if (this.isValidCoordinate(this.latitude) && this.isValidCoordinate(this.longitude)) {
      this.addMarkerEvent.emit({ latitude: this.latitude, longitude: this.longitude });
    } else {
      alert('Please enter valid coordinates');
    }
  }

  isValidCoordinate(coord: number): boolean {
    // Simple validation for latitude and longitude
    return !isNaN(coord) && coord >= -90 && coord <= 90;
  }
}
