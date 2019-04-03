import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import { ConfigProvider } from '../providers/config/config';
import {TranslateService} from "ng2-translate";


@Component({
  templateUrl: 'app.html',
  providers: [
    ConfigProvider
  ]
})
export class MyApp {
  rootPage:any;

  constructor(
              platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              configProvider: ConfigProvider,
              private translate: TranslateService
            ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      //Configura a língua a ser utilizada pelo arquivo global
      // add language translation file i.e. 'en.json' &amp; 'de.json'
      this.translate.addLangs(["pt-br"]);
      // use a default language
      this.translate.use('pt-br');
      console.log('translate: ', this.translate)

      let config = configProvider.getConfigData();
      let configJSON = JSON.parse(config);
/*       console.log("Config: " + config);
      console.log("valor: " + configJSON.showSlide) */
      if(config == null|| configJSON.showSlide){
        this.rootPage = IntroPage;
        configProvider.setConfigData(false);
      } else {
        this.rootPage = TabsPage;
      }

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}