import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  form: FormGroup;
  language: any;
  title = 'Change Language'
  message = 'Do you want to change the language?'
  languages = [
    { text: 'Português', value: 'pt-br' },
    { text: 'English', value: 'en' }
];

  constructor(private fb: FormBuilder,public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private translate: TranslateService) {
    this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  presentAlert(language) {
    let alert = this.alertCtrl.create({
      title: this.title,
      message: this.message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.changeLanguage(language.value);
          }
        }
      ]
    })
    alert.present();
  }

  changeLanguage2(){
    this.translate.use((this.form.get('language').value).value);
  }

  changeLanguage(language) {
    if (language == 'Português') {
      this.translate.use('pt-br')
    }
    else {
      this.translate.use('en')
    }
  }

  createForm() {
    this.form = this.fb.group({
        language: new FormControl(this.languages[0])
        /*  destino: new FormControl('', Validators.required), */
    })
  };

}
