
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj'
import { defaults as defaultControls, ZoomToExtent } from 'ol/control'
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { MapModel } from '../models/map.model';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
import { createInjectableType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MapServices {
    map!: Map;
    mapView!: View;
    tileLayer!: any;
    markerSource!: VectorSource;
    markerLayer!: VectorLayer<VectorSource>;
    private markerAddedSubject = new Subject<{ map: Map }>();

    mapModel: MapModel = {
        latitude: 0,
        longitude: 0
    }

    initializeMap(mapContainer: string) {

        this.tileLayer = new TileLayer({
            source: new OSM()
        })

        this.mapView = new View({
            center: fromLonLat([0, 0]),
            zoom: 2
        });

        this.map = new Map({
            view: this.mapView,
            target: mapContainer,
            layers: [this.tileLayer],
            controls: defaultControls().extend([
                new ZoomToExtent({
                    extent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34]
                })
            ])
        })
    }

    initializeMarker(): Map {
        this.markerSource = new VectorSource();
        this.markerLayer = new VectorLayer({
            source: this.markerSource
        });
        this.map.addLayer(this.markerLayer);
        return this.map;
    }

    addMarker(model: MapModel) {
        console.log(model)
        const marker = new Feature({
            geometry: new Point(fromLonLat([model.longitude, model.latitude]))
        })
        marker.setStyle(new Style({
            image: new Icon({
                src: 'assets/marker.png', // Path to your marker icon
                scale: 0.1
            })
        }));

        this.markerSource.addFeature(marker);

        this.markerAddedSubject.next({ map: this.map });

    }
    removeMarker() {
        this.markerSource.clear();
    }
    isValidCoordinate(coord: number): boolean {
        return !isNaN(coord) && coord >= -90 && coord <= 90;
    }
    get markerAdded$() {
        return this.markerAddedSubject.asObservable();
    }
}