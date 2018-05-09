import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Platform } from 'ionic-angular';

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
  public evento_clicado:string;
  public user_logged: Array<any>;
  constructor(
    private _platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventoPage');
    let evento_select = this.navParams.get('evento');
    this.evento_clicado = this.navParams.get('evento');
    this.user_logged = this.navParams.get('user');
    console.log(this.user_logged);
  }

  scanCode(){
    if(this._platform.is("cordova"))
    { this.barcodeScanner.scan().then(barcodeData =>{
        this.scannedCode = barcodeData.text;
        console.log(this.scannedCode);
      })
    }
    else{
      console.log("The code Works. Not crashing");
    }
    
  }
}
