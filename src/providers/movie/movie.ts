import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//injectable basicamente refere ao fato de que a classe vai ser usada dentro de outra classe
//compatrilhado com outras partes do app
@Injectable()
export class MovieProvider {
  //boa prática pra não ficar repetindo url toda hora
  private baseApiPath = "https://api.themoviedb.org/3";
  constructor(public http: Http) {
    console.log('Hello MovieProvider Provider');
  }

  //criando método para solicitar a informação
  getLatesteMovies(){
    return this.http.get(this.baseApiPath + "/movie/popular?api_key=b5d4f42555dcd09db280a4d7658169d3");
  }

}
