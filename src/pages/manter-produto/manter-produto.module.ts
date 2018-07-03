import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManterProdutoPage } from './manter-produto';

@NgModule({
  declarations: [
    ManterProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(ManterProdutoPage),
  ],
})
export class ManterProdutoPageModule {}
