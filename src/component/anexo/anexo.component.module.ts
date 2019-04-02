import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AnexoComponent } from './anexo.component';
import { ExpandPreviewPageModule } from './expand-preview/expand-preview.module';

@NgModule({
    declarations: [
        AnexoComponent
    ],
    imports: [
        IonicModule,
        ExpandPreviewPageModule
    ],
    exports: [
        AnexoComponent
    ], entryComponents: [
        AnexoComponent
    ]
})
export class AnexoComponentModule { }