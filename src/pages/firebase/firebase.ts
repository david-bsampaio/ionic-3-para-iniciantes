import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { ContactProvider } from '../../providers/contact/contact';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface Produto {
  descricao: string;
  id: number;
  nome: string;
 }

@IonicPage()
@Component({
  selector: 'page-firebase',
  templateUrl: 'firebase.html',
})
export class FirebasePage {

  itemsCollection: AngularFirestoreCollection<Produto>; //Firestore collection

  items: Observable<Produto[]>; // read collection
  
  constructor(
    public navCtrl: NavController, private afs: AngularFirestore,
    private toast: ToastController
      ) {
        // this.contacts = this.provider.getAll();
  }

  ionViewWillEnter() {
    this.itemsCollection = this.afs.collection('produto'); //ref()
    this.items = this.itemsCollection.valueChanges();
 }

incluirProduto(){
  this.itemsCollection.add({
    descricao: "1TB Space with great performance",
    nome:'1TB',
    id: 13423
  })
  .then( (result) => {
      console.log("Document addded with id >>> ", result.id);
  })
  .catch( (error) => {
      console.error("Error adding document: ", error);
  });
}

}
