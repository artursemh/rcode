import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//injectable basicamente refere ao fato de que a classe vai ser usada dentro de outra classe
//compatrilhado com outras partes do app
@Injectable()
export class AuthProvider {
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
  getAuth(usuario:string, senha:string){
    //let user_login = this.navParams.get('user');
    //let pass_login = this.navParams.get('pass');
    return this.http.get(this.basePath + "/webservice/api/auth.php?user=" + usuario + "&senha="+ senha);
    //return this.http.get(this.baseApiPath);
  }

}
