import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument 
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class PessoaService {
  pessoaCollection: AngularFirestoreCollection<Pessoa>;
  pessoas: Observable<Pessoa[]>;
  pessoasDoc: AngularFirestoreDocument<Pessoa>;

  constructor(public afs:AngularFirestore) {
    this.pessoaCollection = this.afs.collection('pessoa',ref => ref.orderBy('nome'));
    // this.tasks = this.afs.collection('tasks').valueChanges();
    this.pessoas = this.pessoaCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Pessoa;
        data.uuid = a.payload.doc.id;
        return data;
      });
    });
  }

  getPessoas() {
    return this.pessoas; 
  }

  addPessoa(pessoa: Pessoa): Promise<any>{
    return this.pessoaCollection.add(pessoa);
  }

  deletePessoa(pessoa: Pessoa): Promise<any> {
    this.pessoasDoc = this.afs.doc(`pessoa/${pessoa.uuid}`);
    return this.pessoasDoc.delete();
  }

  updatePessoa(pessoa: Pessoa): Promise<any> {
    this.pessoasDoc = this.afs.doc(`pessoa/${pessoa.uuid}`);
    return this.pessoasDoc.update(pessoa);
  }
}