import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClientPage } from '../client/client';
import { AuthPage } from '../auth/auth';
//import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public authPath: "http://www.roboticajr.com.br";
  private credencial: any = {
    usuario: '',
    senha: ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //injetando o movieprovider apenas nessa parte do código
  ) {
  }
  public login() {
    this.navCtrl.push(AuthPage, {
      user: this.credencial.usuario,
      pass: this.credencial.senha
    });
    console.log(this.credencial.usuario);
  }
}