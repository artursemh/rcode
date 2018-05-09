import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ClientPage } from '../client/client';
import { HomePage } from '../home/home';

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
  public login_auth: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
    this.authProvider.getAuth(<string>this.navParams.get('user'), <string>this.navParams.get('pass')).subscribe(
      data=>{
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.resp_auth = objeto_retorno;
        //this.login_auth = <string>this.resp_auth.login.auth;
        this.login_auth = <string>objeto_retorno.login.auth;
        console.log(this.login_auth);
        //alert(this.login_auth);
        //console.log(data); 
        if(this.login_auth == "1")
        { this.navCtrl.push(ClientPage, {
            permition: objeto_retorno.login.auth,
            usuario: objeto_retorno.login.usuario
          }); 
          console.log("ola");
        }
        else{
          alert("Credenciais inválidas");
          this.navCtrl.push(HomePage);
        }
      },
      error=>{
        console.log(error)
      },
    ) 
  }

  /*public login() {
    this.navCtrl.push(AuthPage, {
      user: this.credencial.usuario,
      pass: this.credencial.senha
    });
    console.log(this.credencial.usuario);
  }*/

}
