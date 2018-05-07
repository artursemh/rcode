import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  public evento_clicado:string;
  public user_logged: Array<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventoPage');
    let evento_select = this.navParams.get('evento');
    this.evento_clicado = this.navParams.get('evento');
    this.user_logged = this.navParams.get('user');
    console.log(this.user_logged);
  }

}
