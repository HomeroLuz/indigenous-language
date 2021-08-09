import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Media } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

import { IonicStorageModule } from '@ionic/storage-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), BrowserAnimationsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, MediaCapture, Media, File, NativeAudio],
  bootstrap: [AppComponent],
})
export class AppModule {}
