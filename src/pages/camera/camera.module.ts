import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraPage } from './camera';
import { AnexoComponentModule } from '../../component/anexo/anexo.component.module';

@NgModule({
  declarations: [
    CameraPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraPage),
    AnexoComponentModule
  ],
})
export class CameraPageModule {}
