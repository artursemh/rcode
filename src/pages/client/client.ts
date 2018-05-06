import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RcodeProvider } from '../../providers/rcode/rcode';

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

  public nome_user:string = "Artur";
  /*Pra variavel aparecer no html é preciso fazer um binding {{}} */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //injetando o movieprovider apenas nessa parte do código
    private rcodeProvider: RcodeProvider
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
    this.rcodeProvider.getRcode().subscribe(
      data=>{
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        this.lista_rcode = objeto_retorno.results;
        console.log(response._body);
        //console.log(data);
      },
      error=>{
        console.log(error)
      }
    )
  }

}
