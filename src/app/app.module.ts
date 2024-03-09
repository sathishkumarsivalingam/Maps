import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormOverlayComponent } from './form-overlay/form-overlay.component';
import { OpenMapComponent } from './open-map/open-map.component';
import { MapServices } from './services/map.services';

@NgModule({
  declarations: [
    AppComponent,
    FormOverlayComponent,
    OpenMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [MapServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
