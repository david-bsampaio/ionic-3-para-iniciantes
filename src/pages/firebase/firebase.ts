import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ManterProdutoPage } from '../manter-produto/manter-produto';
import { ProdutoService } from '../../app/services/produto.service';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firebase',
  templateUrl: 'firebase.html',
})
export class FirebasePage {

  itemsCollection: AngularFirestoreCollection<Produto>; //Firestore collection
  items: Observable<Produto[]>; // read collection
  produtos: Observable<Produto[]>;  
  
  constructor(
    public navCtrl: NavController, private afs: AngularFirestore,
    public modalCtrl: ModalController,
    private produtoService: ProdutoService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
      ) {
  }

  ionViewWillEnter() {
    this.produtos = this.produtoService.getProdutos();
 }

 inserir() {
  const modal = this.modalCtrl.create(ManterProdutoPage, {tipo: "inserir"});
  modal.present();
}

  editarProduto(produto:any) {
    const modal = this.modalCtrl.create(ManterProdutoPage, {produto});
    modal.present();
  }

  removerProduto(produto:any){
    const confirm = this.alertCtrl.create({
      title: `Exclusão!`,
      message: `Deseja remover o produto ${produto.nome}?`,
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
            this.produtoService.deleteProduto(produto)
            .then(() => {
              this.toastCtrl.create({ message: `Produto ${produto.nome} removido.`, duration: 3000 }).present();
            })
            .catch((e) => {
              this.toastCtrl.create({ message: 'Erro ao remover o produto.', duration: 3000 }).present();
              console.error(e);
            })
          }
        }
      ]
    });
    confirm.present();
  }
}
