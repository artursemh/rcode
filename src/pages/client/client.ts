import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

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
    MovieProvider
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

  public lista_filmes: Array<any>;

  public nome_user:string = "Artur";
  /*Pra variavel aparecer no html é preciso fazer um binding {{}} */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //injetando o movieprovider apenas nessa parte do código
    private movieProvider: MovieProvider
  ) {
  }

  /*Criando função*/
  /*Função que não seja do tipo any ou void tem que retornar algo*/
  public SomaDoisNumeros(num1:number, num2:number):void{
    //alert(num1+num2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientPage');
    /*Aqui dentro executam ações quando a página for carregada */
    /*console.log('ionViewDidLoad FeedPage');*/
    
    /*This para executar */
    /*this.SomaDoisNumeros(33, 8);*/

    //Observable "diz": observe a função, qundo ela me retornar o resultado é passado para ser usado
    //getLatestMovies é Observable
    this.movieProvider.getLatesteMovies().subscribe(
      //quando consegue o retorno da informação, entra no data, quando der erro entra na error
      data=>{
        //transforma a resposta em "qq coisa" pra poder receber todo tipo de info
        const response = (data as any);
        //transforma a resposta em JSON pq o angular pega Json e transforma em texto
        //depois é necessário transformar em json novamente
        const objeto_retorno = JSON.parse(response._body);
        this.lista_filmes = objeto_retorno.results;
        console.log(response._body);
      },
      error=>{
        console.log(error)
      }
    )
  }

}
