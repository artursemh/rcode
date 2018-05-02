import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { EventoPage } from '../pages/evento/evento';
import { ClientPage } from '../pages/client/client';
import { SearchPage } from '../pages/search/search';


@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public objeto_feed = {
    titulo: "Artur Amaral",
    data: "25 de Abril, 2018",
    descricao: "There's a news feed on my app. That's interesting.",
    likes: 12,
    comments: 6,
    time_ago: "10h ago"
  }

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Cliente', component: ClientPage },
      { title: 'List', component: ListPage },
      { title: 'Evento', component: EventoPage },
      { title: 'Sair', component: HomePage },
      { title: 'Busca', component: SearchPage }
    ];

  }

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
