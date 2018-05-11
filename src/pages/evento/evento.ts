import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
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
  presenca_rcode: string;
  lista_rcode2: string;
  resp_eventos: Array<any>;
  scannedCode = null;
  scannedOutput = null;
  basePath = "/rcodeapi";
  public evento_clicado: string;
  public user_logged: Array<any>;
  public palestra: string;
  public options: BarcodeScannerOptions;

  constructor(
    private _platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private http: Http,
  ) {
    if (this._platform.is("cordova")) {
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

  scanCode() {
    let evento = this.navParams.get('evento');
    let palestra = this.navParams.get('palestra');
    if (this._platform.is("cordova")) {
      this.options = {
        prompt: "Scan your barcode "
      }
      this.barcodeScanner.scan().then(barcodeData => {
        this.scannedCode = barcodeData.text;
        let resposta = "https://www.roboticajr.com.br/webservice/api/inscritos.php?evento=" + evento + "&palestra=" + palestra + "&JSON=presenca&scan=" + this.scannedCode;
        let ans = this.http.get(resposta);
        ans
          .subscribe(data => {
            //const dado = (data as any);
            //console.log('my data: ', dado);
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            this.resp_eventos = objeto_retorno.CHECAGEM;
            this.presenca_rcode = objeto_retorno.CHECAGEM.CHECK;
            //this.call_palestra = objeto_retorno.results[0];
            console.log(this.presenca_rcode);
            if(this.presenca_rcode == "0"){
              this.scannedOutput = "Participante não cadastrado nesta palestra.";
            }
            else{
              this.scannedOutput = this.scannedCode;
            }
            //console.log(data); 
    
          })
      })
    }
    else {
      //let reposta:any = 
      /*let resposta = "https://www.roboticajr.com.br/webservice/api/inscritos.php?evento=" + evento + "&palestra=" + palestra + "&JSON=presenca&scan=22-22";
      this.scannedCode = "Ta funcionando ev:" + evento + " pal: " + palestra;
      let ans = this.http.get(resposta);
      ans
        .subscribe(data => {
          console.log('my data: ', data);
        })*/

        let resposta = "/rcodeapi/webservice/api/inscritos.php?evento=" + evento + "&palestra=" + palestra + "&JSON=presenca&scan=20-20";
        let ans = this.http.get(resposta);
        ans
          .subscribe(data => {
            //const dado = (data as any);
            //console.log('my data: ', dado);
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            this.resp_eventos = objeto_retorno.CHECAGEM;
            this.lista_rcode2 = objeto_retorno[0].CHECAGEM[0].CHECK;
            //this.call_palestra = objeto_retorno.results[0];
            console.log(this.lista_rcode2);
            if(this.lista_rcode2 == "0"){
              this.scannedOutput = "Participante não cadastrado nesta palestra.";
            }
            else{
              this.scannedOutput = "Check:" + this.lista_rcode2;
            }

          })
    }
  }
}