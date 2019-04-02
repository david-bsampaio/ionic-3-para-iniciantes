import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage({
    name: 'expand-preview',
    segment: 'expand-preview'
})
@Component({
    selector: 'expand-preview',
    templateUrl: 'expand-preview.html',
})
export class ExpandPreviewPage {

    preview: any;
    title: string;
    url: string;

    constructor(public viewCtrl: ViewController, public navParams: NavParams) {

        if (this.navParams.get('file')) {

            let fileNav = this.navParams.get('file');

            this.preview = (fileNav.file.type.indexOf("image") >= 0) ? fileNav.preview : null;
            this.url = (fileNav.file.type.indexOf("pdf") >= 0) ? URL.createObjectURL(fileNav.file) : null;

            this.title = fileNav.file.name;

        } 

    }

    fecharModal() {
        this.viewCtrl.dismiss();
    }

}
