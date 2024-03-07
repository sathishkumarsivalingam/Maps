import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
import { defaults as defaultControls, ZoomToExtent } from 'ol/control';
import { VectorTileRenderType } from 'ol/layer/VectorTile';
import { VectorSourceEventTypes } from 'ol/source/VectorEventType';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map!: Map;
  markerLayer!: VectorLayer<VectorSource>;
  markerSource!: VectorSource;

  ngOnInit() {
    this.initMap();
    this.initMarkerLayer();
  }

  initMap() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2
      }),
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: [
            -20037508.34, -20037508.34, 20037508.34, 20037508.34
          ]
        })
      ])
    });
  }
  initMarkerLayer() {
    this.markerSource = new VectorSource();
    this.markerLayer = new VectorLayer({
      source: this.markerSource
    });
    this.map.addLayer(this.markerLayer);
  }

  addMarker(event: { latitude: number, longitude: number }) {
    const { latitude, longitude } = event;
    const marker = new Feature({
      geometry: new Point(fromLonLat([longitude, latitude]))
    });
    marker.setStyle(new Style({
      image: new Icon({
        src: 'assets/marker.png', // Path to your marker icon
        scale: 0.1
      })
    }));
    this.markerSource.addFeature(marker);
  }
}
