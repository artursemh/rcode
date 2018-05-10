import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RcodeProvider } from '../../providers/rcode/rcode';
import { EventoPage } from '../evento/evento';
import { HomePage } from '../home/home';

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

  public objeto_feed = {
    titulo: "Artur Amaral",
    data: "25 de Abril, 2018",
    descricao: "There's a news feed on my app. That's interesting.",
    likes: 12,
    comments: 6,
    time_ago: "10h ago"
  }

  public lista_rcode: Array<any>;
  public resp_eventos: Array<any>;
  public call_palestra: Array<any>;
  public login_eventos: string;
  public user: Array<any>;

  public nome_user:string = "Artur";
  /*Pra variavel aparecer no html é preciso fazer um binding {{}} */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //injetando o movieprovider apenas nessa parte do código
    private rcodeProvider: RcodeProvider,
  ) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientPage');
    /*Aqui dentro executam ações quando a página for carregada */
    /*console.log('ionViewDidLoad FeedPage');*/
    
    /*This para executar */
    /*this.SomaDoisNumeros(33, 8);*/

    //Observable "diz": observe a função, qundo ela me retornar o resultado é passado para ser usado
    //getLatestMovies é Observable

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

  palestras(evento:any){
    this.navCtrl.push(EventoPage, {evento, user:this.call_palestra}); 
    console.log(evento);
  }

  home(palestra:any, evento:any){
    this.navCtrl.push(EventoPage, {palestra, evento});
    console.log(palestra);
  }

}
