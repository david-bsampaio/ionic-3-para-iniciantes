import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpandPreviewPage } from './expand-preview';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    ExpandPreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpandPreviewPage),
    PdfViewerModule
  ],
})
export class ExpandPreviewPageModule { }
