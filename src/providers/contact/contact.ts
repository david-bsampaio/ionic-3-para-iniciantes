import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ModalController } from 'ionic-angular/umd';
import { ManterProdutoPage } from '../../pages/manter-produto/manter-produto';

interface Produto {
  descricao: string;
  id: number;
  nome: string;
 }

@Injectable()
export class ContactProvider {
  private PATH = 'produto/';

  itemsCollection: AngularFirestoreCollection<Produto>; //Firestore collection

  // items: Observable<Produto[]>; // read collection

  constructor(private afs: AngularFirestore) {
  }

  ionViewWillEnter() {
    this.itemsCollection = this.afs.collection('produto'); //ref()
    // this.items = this.itemsCollection.valueChanges()
 }

}