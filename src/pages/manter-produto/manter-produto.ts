import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProdutoService } from '../../app/services/produto.service';

/**
 * Generated class for the ManterProdutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manter-produto',
  templateUrl: 'manter-produto.html',
})
export class ManterProdutoPage {
  inclusao:boolean;
  form: FormGroup;
  itemsCollection: AngularFirestoreCollection<Produto>; //Firestore collection
  titulo:string;
  produto:Produto = this.navParams.data.produto || { };

  /* {id:null, nome:"", descricao:""} */


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuilder: FormBuilder,
    private toastCtrl:ToastController,
    private afs: AngularFirestore,
    private produtoService: ProdutoService,
  ) {
    this.inclusao = navParams.get('tipo') == "inserir"? true: false;
    this.titulo = navParams.get('tipo') == "inserir"? "Inserir Produto": "Editar Produto";
    this.createForm();
  }

  ionViewDidLoad() {
    this.itemsCollection = this.afs.collection('produto');
    console.log('ionViewDidLoad ManterProdutoPage');
  }


  createForm() {
    this.form = this.formBuilder.group({
      uuid: [this.produto.uuid],
      /* id: [this.produto.id, Validators.required], */
      nome: [this.produto.nome, Validators.required],
      descricao: [this.produto.descricao],
    });
  }

  salvar(){
   if (!this.form.value.uuid) {
     this.incluirProduto();
   } else {
     this.alterarProduto();
   } 
  }

  incluirProduto() {
    if (this.form.valid) {
      // this.itemsCollection.add(this.form.value)
      this.produtoService.addProduto(this.form.value)
        .then(() => {
          this.toastCtrl.create({ message: 'Produto salvo com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toastCtrl.create({ message: 'Erro ao salvar o produto.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }

  alterarProduto() {
    if (this.form.valid) {
      this.produtoService.updateProduto(this.form.value)
        .then(() => {
          this.toastCtrl.create({ message: 'Produto alterado com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toastCtrl.create({ message: 'Erro ao alterar o produto.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }

  voltar(){
    this.navCtrl.pop();
  }

  limpar(){
    this.createForm();
  }
}
