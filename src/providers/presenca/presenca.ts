//import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//injectable basicamente refere ao fato de que a classe vai ser usada dentro de outra classe
//compatrilhado com outras partes do app
@Injectable()
export class PresencaProvider {
  //boa prática pra não ficar repetindo url toda hora;
  basePath = "/rcodeapi"
  //private baseApiPath = "http://www.roboticajr.com.br/webservice/api/";
  constructor(
    public http: Http,
    private _platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    //console.log('Hello RcodeProvider Provider');
    if(this._platform.is("cordova")){
      this.basePath = "http://www.roboticajr.com.br";
    }
  }

  //criando método para solicitar a informação
  getScan(evento:string, palestra:string, scan:string){
    return this.http.get(this.basePath + "/webservice/api/inscritos.php?evento="+evento+"&palestra="+palestra+"&JSON=presenca"+"&scan="+scan);
    //return this.http.get(this.baseApiPath);
  }

}
