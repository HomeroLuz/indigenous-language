import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  dateStr:String = "";
  status:String = "";
  audioFileName:String = "";
  audioFile:MediaObject;
  constructor( private menuCtrl: MenuController, private media:Media, private file:File) {
    console.log("*********************Welcome the virtual world xtt************************");
  }

  showMenu() {
    this.menuCtrl.open('first');
  }

  RecordAudio() {
    this.audioFileName = "audiofile" + Date.now();
    this.audioFile = this.media.create(this.file.externalRootDirectory+'/'+this.audioFileName+'.mp3')
    this.audioFile.startRecord();
    this.status = "recording...";
  }

  StopRecording() {
    this.audioFile.stopRecord();
    this.status = "stopped, " + this.audioFileName + ".mp3 saved";
  }

}
