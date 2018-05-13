import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { PresencaProvider } from '../../providers/presenca/presenca';
import { SearchPage } from '../search/search';

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
  private nomeBuscado: any = {
    nome: '',
  };
  presenca_rcode: string;
  lista_rcode2: string;
  resp_eventos: Array<any>;
  public palestraNome:any;
  scannedCode = null;
  scannedOutput = null;
  basePath = "/rcodeapi";
  public evento_clicado: string;
  public user_logged: Array<any>;
  public palestra: string;
  public evento: string;
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
    this.palestra = this.navParams.get('palestraId');
    //this.user_logged = this.navParams.get('user');
    this.palestraNome = this.navParams.get('palestraNome');
    console.log("Id Palestra: "+this.palestra);
    console.log("Id evento:" + this.evento_clicado);
    console.log("Ev:" + this.evento_clicado);
    

  }


  busca(evento:any, palestra:any){
    this.navCtrl.push(SearchPage, {evento, palestra, nome: this.nomeBuscado.nome, palestraNome: this.palestraNome});    
  }

  scanCode() {
    this.evento = this.navParams.get('evento');
    this.palestra = this.navParams.get('palestraId');
    if (this._platform.is("cordova")) {
      this.options = {
        prompt: "Scan your barcode "
      }
      this.barcodeScanner.scan().then(barcodeData => {
        this.scannedCode = barcodeData.text;
        this.scannedOutput = this.scannedCode;
        let resposta = "https://www.roboticajr.com.br/webservice/api/inscritos.php?evento=" + this.evento + "&palestra=" + this.palestra + "&JSON=presenca&scan=" + this.scannedCode;
        let ans = this.http.get(resposta);
        ans
          .subscribe(data => {
            //const dado = (data as any);
            //console.log('my data: ', dado);
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            this.resp_eventos = objeto_retorno[0].CHECAGEM;
            this.presenca_rcode = objeto_retorno[0].CHECAGEM[0].CHECK;
            //this.call_palestra = objeto_retorno.results[0];
            console.log(this.presenca_rcode);
            if(<string>this.presenca_rcode == "0"){
              this.scannedOutput = "Participante não cadastrado nesta palestra.";
              alert("Participante não cadastrado nesta palestra.");
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
        this.scannedOutput = "99-70";
        let resposta = "/rcodeapi/webservice/api/inscritos.php?evento=" + this.evento + "&palestra=" + this.palestra + "&JSON=presenca&scan="+this.scannedOutput;
        let ans = this.http.get(resposta);
        ans
          .subscribe(data => {
            //const dado = (data as any);
            //console.log('my data: ', dado);
           /* const response = (data as any);
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
            }*/
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            this.resp_eventos = objeto_retorno[0].CHECAGEM;
            this.presenca_rcode = objeto_retorno[0].CHECAGEM[0].CHECK;
            //this.call_palestra = objeto_retorno.results[0];
            console.log(this.presenca_rcode);
            if(<string>this.presenca_rcode == "0"){
              this.scannedOutput = "Participante não cadastrado nesta palestra.";
              alert("Participante não cadastrado nesta palestra.");
            }
            else{
              this.scannedOutput = this.scannedCode;
            }


          })
    }
  }
}