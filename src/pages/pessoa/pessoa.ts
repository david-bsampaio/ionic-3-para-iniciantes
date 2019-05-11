import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { PessoaService } from '../../app/services/pessoa.service';
import { ManterPessoaPage } from '../manter-pessoa/manter-pessoa';

/**
 * Generated class for the PessoaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pessoa',
  templateUrl: 'pessoa.html',
})
export class PessoaPage {

  pessoas: Observable<Pessoa[]>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public pessoaService: PessoaService, public modalCtrl: ModalController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }


  ionViewWillEnter() {
    this.inicializaPessoas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PessoaPage');
  }

  inicializaPessoas(){
    this.pessoas = this.pessoaService.getPessoas();
  }

  inserir() {
    console.log('entrei no inserir');
    const modal = this.modalCtrl.create(ManterPessoaPage, {tipo: "inserir"});
    modal.present();
  }
  
    editarPessoa(pessoa:any) {
      const modal = this.modalCtrl.create(ManterPessoaPage, {pessoa});
      modal.present();
    }
  
    removerPessoa(pessoa:any){
      const confirm = this.alertCtrl.create({
        title: `Exclusão!`,
        message: `Deseja remover o pessoa ${pessoa.nome}?`,
        buttons: [
          {
            text: 'Não',
            handler: () => {
              console.log('Clicou em Não');
            }
          },
          {
            text: 'Sim',
            handler: () => {
              console.log('Clicou em Sim');
              this.pessoaService.deletePessoa(pessoa)
              .then(() => {
                this.toastCtrl.create({ message: `Pessoa ${pessoa.nome} removido.`, duration: 3000 }).present();
              })
              .catch((e) => {
                this.toastCtrl.create({ message: 'Erro ao remover o pessoa.', duration: 3000 }).present();
                console.error(e);
              })
            }
          }
        ]
      });
      confirm.present();
    }
  
    getItems(ev: any) {
      // Reset items back to all of the items
       this.inicializaPessoas();
  
      // set val to the value of the searchbar
      const val = ev.target.value;
  
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.pessoas = this.pessoas.map(items => items.filter((pessoa) => {
          return (pessoa.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      )
      }
    }
}
