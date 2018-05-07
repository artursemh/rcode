import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { EventoPageModule } from '../pages/evento/evento.module';
import { ClientPageModule } from '../pages/client/client.module';
import { SearchPageModule } from '../pages/search/search.module';
import { AuthPageModule } from '../pages/auth/auth.module';]
import { AccordionPageModule } from '../pages/accordion/accordion.module';

import { AccordionComponent} from '../components/accordion/accordion';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AccordionComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    EventoPageModule,
    ClientPageModule,
    SearchPageModule,
    AuthPageModule,
    AccordionPageModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {}
