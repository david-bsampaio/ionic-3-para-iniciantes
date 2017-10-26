import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    ConfigProvider
  ]
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public toastCtrl: ToastController,
    private configProvider: ConfigProvider
  ) {

  }

  goToTabsPage(){
    this.configProvider.setConfigData(true);
    this.presentToast("A próxima execução exibirá a tela de Introdução!");
  }

  presentToast(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 5000
    });
    toast.present();
  }

}
