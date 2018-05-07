import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
  providers: [
    AuthProvider
  ]
})
export class AuthPage {
  public resp_auth: Array<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientPage');
    this.authProvider.getAuth(<string>this.navParams.get('user'), <string>this.navParams.get('pass')).subscribe(
      data=>{
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.resp_auth = objeto_retorno;
        console.log(response._body);
        //console.log(data); 
      },
      error=>{
        console.log(error)
      },
    ) 
  }

}
