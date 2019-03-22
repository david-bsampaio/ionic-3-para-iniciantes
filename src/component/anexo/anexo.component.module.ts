import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AnexoComponent } from './anexo.component';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
    declarations: [
        AnexoComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        AnexoComponent
    ], entryComponents: [
        AnexoComponent
    ], providers: [
        Camera
    ]
})
export class AnexoComponentModule { }