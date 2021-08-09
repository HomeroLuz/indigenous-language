import { Component, OnInit } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { MenuController } from '@ionic/angular';

const MEDIA_FOLDER_NAME = 'IndLexFolder';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  dateStr:String = "";
  status:String = "";

  audioPath:String = "";
  audioFileName:String = "";
  audioFileExt:String = "";
  isAudioRecording:boolean = false;
  isCreateFileAudio:boolean = false;
  audioFile:MediaObject;

  constructor( private nativeAudio: NativeAudio,
    private mediaCapture: MediaCapture,
    private file: File,
    private media: Media,
    private plt: Platform,
    private menuCtrl: MenuController) {
    console.log("*********************Play and delete audio************************");
  }

  showMenu() {
    this.menuCtrl.open('first');
  }

  ngOnInit() {
    this.plt.ready().then(() => {
      // Para la carpeta home
      this.audioPath = this.file.externalRootDirectory;
      // Para la carpeta la aplicacion en Android Data
      // this.audioPath = this.file.externalDataDirectory;
      console.log("path: " + this.audioPath);
      console.log("MEDIA_FOLDER_NAME: " + MEDIA_FOLDER_NAME);
      this.file.checkDir(this.audioPath+"", MEDIA_FOLDER_NAME).then(
        () => {
          console.log("Mostrar boton para ver archivos de audio grabados");
        },
        () => {
          this.file.createDir(this.audioPath+"", MEDIA_FOLDER_NAME, false);
        }
      );
    });
  }

  recordAudio() {
  
    this.audioFileName =
    'audiofile' +
    new Date().getDate() +
    new Date().getMonth() +
    new Date().getFullYear() +
    new Date().getHours() +
    new Date().getMinutes() +
    new Date().getSeconds();
    console.log("audioFileName: " + this.audioFileName);

    if (this.plt.is('ios')) {
      console.log("Platform = iOs");
      this.audioFileExt = '.m4a';
      this.audioFileName = this.audioFileName + "" + this.audioFileExt;
      this.audioPath = this.file.documentsDirectory + this.audioFileName;
      this.audioFile = this.media.create(this.audioPath.replace(/file:\/\//g, ''));
    } else if (this.plt.is('android')) {
      console.log("Platform = Android");
      this.audioFileExt = '.mp3';
      this.audioFileName = this.audioFileName + "" + this.audioFileExt;
      // Para la carpeta home
      this.audioPath = this.file.externalRootDirectory + MEDIA_FOLDER_NAME + "/" + this.audioFileName;
      // Para la carpeta la aplicacion en Android Data
      // this.audioPath = this.file.externalDataDirectory + MEDIA_FOLDER_NAME + "/" + this.audioFileName;
      console.log("this.audioPath: " + this.audioPath.replace(/file:\/\//g, ''));
      this.audioFile = this.media.create(this.audioPath.replace(/file:\/\//g, ''));
    }

    this.audioFile.startRecord();
    this.isAudioRecording = true;
    this.isCreateFileAudio = false;
    this.status = "recording...";
  }

  stopRecording() {
    this.audioFile.stopRecord();
    this.status = "stopped, " + this.audioFileName + " saved";
    this.isAudioRecording = false;
    this.isCreateFileAudio = true;
  }

  playAudioFile() {
    this.audioFile = this.media.create(this.audioPath+"");
    this.audioFile.play();
    this.audioFile.setVolume(0.8);
    this.status = "play: " + this.audioFileName;
  }

  deleteFile() {
    const path = this.audioPath.substr(0, this.audioPath.lastIndexOf('/') + 1);
    this.file.removeFile(path, this.audioFileName+"").then(() => {
      console.log("archivo borrado");
      this.status = this.audioFileName + " deleted";
      this.isCreateFileAudio = false;
    }, err => console.log('error remove: ', err));
  }
}
