import { Component, OnInit } from '@angular/core';
import { Map } from 'ol';
import { Subscription } from 'rxjs';
import { MapServices } from '../services/map.services';

@Component({
  selector: 'app-open-map',
  templateUrl: './open-map.component.html',
  styleUrls: ['./open-map.component.css']
})
export class OpenMapComponent implements OnInit {

  map!: Map;
  markerAddedSubscription!: Subscription;

  constructor(private mapService: MapServices) { }

  ngOnInit(): void {
    this.mapService.initializeMap('map');
    this.map = this.mapService.initializeMarker();

    this.markerAddedSubscription = this.mapService.markerAdded$.subscribe(() => {
    });
  }

  ngOnDestroy() {
    if (this.markerAddedSubscription) this.markerAddedSubscription.unsubscribe();
  }
}
