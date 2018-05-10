import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { PresencaProvider } from '../../providers/presenca/presenca';

/**
 * Generated class for the EventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {
  lista_rcode: Array<any>;
  resp_eventos: Array<any>;
  scannedCode = null;
  basePath = "/rcodeapi";
  public http: Http;
  public evento_clicado:string;
  public user_logged: Array<any>;
  public palestra: string;

  constructor(
    private _platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
  ) {
    if(this._platform.is("cordova")){
      this.basePath = "https://www.roboticajr.com.br";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventoPage');
    let evento_select = this.navParams.get('evento');
    this.evento_clicado = this.navParams.get('evento');
    this.palestra = this.navParams.get('palestra');
    this.user_logged = this.navParams.get('user');
    console.log("palestra Get:" + this.palestra);

  }

  scanCode(){
    let evento = this.navParams.get('evento');
    let palestra = this.navParams.get('palestra');
    if(this._platform.is("cordova"))
    {  this.barcodeScanner.scan().then(barcodeData =>{
          this.scannedCode = barcodeData.text;
        })
    }
    else{
      this.scannedCode = "Ta funcionando";
    }
  }
}