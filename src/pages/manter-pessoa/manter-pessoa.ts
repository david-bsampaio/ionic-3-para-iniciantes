import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { PessoaService } from '../../app/services/pessoa.service';

/**
 * Generated class for the ManterPessoaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manter-pessoa',
  templateUrl: 'manter-pessoa.html',
})
export class ManterPessoaPage {

  inclusao:boolean;
  form: FormGroup;
  itemsCollection: AngularFirestoreCollection<Pessoa>; //Firestore collection
  titulo:string;
  pessoa:Pessoa = this.navParams.data.pessoa || { };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuilder: FormBuilder,
    private toastCtrl:ToastController,
    private afs: AngularFirestore,
    private pessoaService: PessoaService,
  ) {
    this.inclusao = navParams.get('tipo') == "inserir"? true: false;
    this.titulo = navParams.get('tipo') == "inserir"? "Inserir Pessoa": "Editar Pessoa";
    this.createForm();
  }

  ionViewDidLoad() {
    this.itemsCollection = this.afs.collection('pessoa');
    console.log('ionViewDidLoad ManterPessoa');
  }

  createForm() {
    this.form = this.formBuilder.group({
      uuid: [this.pessoa.uuid],
      /* id: [this.pessoa.id, Validators.required], */
      nome: [this.pessoa.nome, Validators.required],
      cpf: [this.pessoa.cpf],
    });
  }

  salvar(){
   if (!this.form.value.uuid) {
     this.incluirPessoa();
   } else {
     this.alterarPessoa();
   } 
  }

  incluirPessoa() {
    if (this.form.valid) {
      // this.itemsCollection.add(this.form.value)
      this.pessoaService.addPessoa(this.form.value)
        .then(() => {
          this.toastCtrl.create({ message: 'Pessoa salvo com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toastCtrl.create({ message: 'Erro ao salvar o pessoa.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }

  alterarPessoa() {
    if (this.form.valid) {
      this.pessoaService.updatePessoa(this.form.value)
        .then(() => {
          this.toastCtrl.create({ message: 'Pessoa alterado com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toastCtrl.create({ message: 'Erro ao alterar o pessoa.', duration: 3000 }).present();
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
