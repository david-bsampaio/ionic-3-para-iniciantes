import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManterPessoaPage } from './manter-pessoa';

@NgModule({
  declarations: [
    ManterPessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(ManterPessoaPage),
  ],
})
export class ManterPessoaPageModule {}
