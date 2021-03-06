import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RcodeProvider } from '../../providers/rcode/rcode';
import { EventoPage } from '../evento/evento';
import { HomePage } from '../home/home';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
  //injetar componente para que esse codigo reconheça a classe
  providers: [
    RcodeProvider
  ]
})
export class ClientPage {
  public cliente_atual: string;
  public lista_rcode: Array<any> = null;
  public resp_eventos: Array<any>;
  public call_palestra: Array<any>;
  public login_eventos: string;
  public user: Array<any>;
  public try:string; 

  /*Pra variavel aparecer no html é preciso fazer um binding {{}} */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //injetando o movieprovider apenas nessa parte do código
    private rcodeProvider: RcodeProvider,
  ) {
  }

  ionViewWillEnter(){
    this.try = this.navParams.get('try');
    if(!this.navParams.get('try')){
      this.try = "1";
      this.navCtrl.push(HomePage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientPage');
    /*Aqui dentro executam ações quando a página for carregada */
    /*console.log('ionViewDidLoad FeedPage');*/
    //this.is_back ="1";
    //Observable "diz": observe a função, qundo ela me retornar o resultado é passado para ser usado
    //getLatestMovies é Observable
    this.cliente_atual = <string>this.navParams.get('usuario');
    this.rcodeProvider.getRcode(<string>this.navParams.get('usuario'), <string>this.navParams.get('permition')).subscribe(
      data=>{
        const response = (data as any);
        //let permition_login = this.navParams.get('permition');
        //let user_login = this.navParams.get('usuario');
        const objeto_retorno = JSON.parse(response._body);
        this.resp_eventos = objeto_retorno.results;
        //this.login_eventos = <string>this.resp_eventos.INFO.EVENTOS;
        this.lista_rcode = objeto_retorno.results[0].INFO[0].EVENTOS;
        //console.log(response._body);
        this.call_palestra = objeto_retorno.results[0];
        console.log(this.lista_rcode);
        //console.log(data); 
      },
      error=>{
        console.log(error)
      },
    )
  }

  home(palestraId:any, evento:any, palestraNome:any){
    this.navCtrl.push(EventoPage, {palestraId, evento, palestraNome});
    console.log(palestraNome);
  }


}
