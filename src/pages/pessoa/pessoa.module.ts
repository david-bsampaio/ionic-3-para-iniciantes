import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PessoaPage } from './pessoa';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    PessoaPage,
  ],
  imports: [
    MatCardModule,
    IonicPageModule.forChild(PessoaPage),
  ],
  exports: [
    MatCardModule,
  ]
})
export class PessoaPageModule {}
