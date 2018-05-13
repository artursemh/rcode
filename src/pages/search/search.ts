import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { Http } from '@angular/http';
import { EventoPage } from '../evento/evento';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [
    MovieProvider
  ]
})

export class SearchPage {
  
  presenca_rcode: string;
  lista_rcode2: string;
  resp_eventos: Array<any>;
  public palestraNome:any;
  public nomeBuscado:any;
  scannedCode = null;
  scannedOutput = null;
  basePath = "/rcodeapi";
  public evento_clicado: string;
  public user_logged: Array<any>;
  public palestra: string;
  public evento: string;
  public evento_bak: string;
  public palestra_bak: string;
  public nome_bak: string;
  public nomePalestra: string;

  constructor(
    private _platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
  ){}

  ionViewDidLoad(){
    this.evento = <string>this.navParams.get('evento');
    this.palestra = <string>this.navParams.get('palestra');
    this.nomeBuscado = <string>this.navParams.get('nome');
    console.log("nome: "+this.nomeBuscado);
    if (this._platform.is("cordova")) {
        this.scannedOutput = "text";
        let resposta = "https://www.roboticajr.com.br/webservice/api/inscritos.php?evento=" + this.evento + "&palestra=" + this.palestra + "&JSON=busca&scan=" + this.nomeBuscado;
        let ans = this.http.get(resposta);
        console.log(resposta);
        ans
          .subscribe(data => {
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            this.resp_eventos = objeto_retorno[0].CHECAGEM;
            this.presenca_rcode = objeto_retorno[0].CHECAGEM[0].CHECK;
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
    else {
        let resposta = "/rcodeapi/webservice/api/inscritos.php?evento=" + this.evento + "&palestra=" + this.palestra + "&JSON=busca&scan=none-"+this.nomeBuscado;
        let ans = this.http.get(resposta);
        ans
          .subscribe(data => {
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            this.resp_eventos = objeto_retorno[0].RESULTADO;
            this.presenca_rcode = objeto_retorno[0].RESULTADO[0].STATUS;
            console.log(this.resp_eventos);
          })

    }
  }

  presenca(evento_check:any, palestra_check:any, nome_check:any, credencial_check){
    if(this._platform.is("cordova")){
      this.nomePalestra = <string>this.navParams.get('palestraNome');
      let resposta = "https://www.roboticajr.com.br/webservice/api/inscritos.php?evento=" + evento_check + "&palestra=" + palestra_check + "&JSON=presenca&scan="+credencial_check+"-"+nome_check;
      let ans = this.http.get(resposta);
        ans
          .subscribe(data => {
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            this.resp_eventos = objeto_retorno[0].CHECAGEM;
            this.presenca_rcode = objeto_retorno[0].CHECAGEM[0].CHECK;
            this.navCtrl.push(EventoPage, {evento: evento_check, palestraId: palestra_check, nome: nome_check, palestraNome: this.nomePalestra});
            alert("Presença para: "+nome_check);
          })
    }
    else{
      this.nomePalestra = <string>this.navParams.get('palestraNome');
      let resposta = "/rcodeapi/webservice/api/inscritos.php?evento=" + evento_check + "&palestra=" + palestra_check + "&JSON=presenca&scan="+credencial_check+"-"+nome_check;
      let ans = this.http.get(resposta);
        ans
          .subscribe(data => {
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            this.resp_eventos = objeto_retorno[0].CHECAGEM;
            this.presenca_rcode = objeto_retorno[0].CHECAGEM[0].CHECK;
            console.log(this.presenca_rcode);
            //retorna para a Evento
            console.log("Palestra: "+palestra_check+" Evento: "+evento_check+" nome: "+nome_check);
            this.navCtrl.push(EventoPage, {evento: evento_check, palestraId: palestra_check, nome: nome_check, palestraNome: this.nomePalestra});
            alert("Presença para: "+nome_check);
          })
      console.log("evento:"+evento_check+" palestra:"+palestra_check+" nome:"+nome_check);
    }
  }

}