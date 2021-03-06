/*
Olá, se você está acessando esse código, então você deve estar dando manutenção no Rcode.
Venho do ano de 2018 para pedir QUE VOCÊ DOCUMENTE CADA VIRGULA DESSA CARAIA AQUI
PQ A GENTE PEGOU O APP SEM TER O CÓDIGO, CRIOU A VERSÃO 2.0 E TAMO DOCUMENTANDO
COMO SE A VIDA DA NOSSAS MÃES DEPENDESSEM DISSO!

Qualquer dúvida que vocês tiverem, entrem em contato comigo, independentemente do ano.
Uma vez Robótica Jr., sempre Robótica Jr.

carinhosamente,

--
Artur Passos do Amaral
Diretor Presidente
FACEBOOK: https://www.facebook.com/arturpamaral
*/

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { EventoPage } from '../pages/evento/evento';
import { ClientPage } from '../pages/client/client';
import { SearchPage } from '../pages/search/search';
import { AuthPage } from '../pages/auth/auth';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  //public is_back ="0";

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  public user:any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
  ) {
    this.initializeApp();
    //this.user = this.Autentic.login.usuario;
    // used for an example of ngFor and navigation
    this.pages = [
      //{ title: 'Home', component: HomePage },
      //{ title: 'Meus Eventos', component: AuthPage },
      //{ title: 'List', component: ListPage },
      //{ title: 'Evento', component: EventoPage },
      { title: 'Sair', component: HomePage },
      //{ title: 'Busca', component: SearchPage },
      //{ title: 'Autenticação', component: AuthPage }
    ];

  }

  /*openCliente(p){
    this.navCtrl.push(ClientPage, {
      permition: "1",
      usuario: objeto_retorno.login.usuario,
      try: "1",
    });
  }*/

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
