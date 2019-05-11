import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FeedPageModule } from '../pages/feed/feed.module';
import { FirebasePageModule } from '../pages/firebase/firebase.module';
import { IntroPageModule } from '../pages/intro/intro.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule, Http } from '@angular/http';
import { MovieProvider } from '../providers/movie/movie';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ManterProdutoPage } from '../pages/manter-produto/manter-produto';
import { ProdutoService } from './services/produto.service';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraPage } from '../pages/camera/camera';
import { AnexoComponentModule } from '../component/anexo/anexo.component.module';
import {TranslateLoader, TranslateStaticLoader} from "ng2-translate/src/translate.service";
import {TranslateModule} from "ng2-translate/ng2-translate";
import { PessoaPage } from '../pages/pessoa/pessoa';
import { PessoaService } from './services/pessoa.service';
import { ManterPessoaPage } from '../pages/manter-pessoa/manter-pessoa';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ManterProdutoPage,
    ManterPessoaPage,
    CameraPage,
    PessoaPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    FeedPageModule,
    IntroPageModule,
    HttpModule,
    FirebasePageModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDNCB7UknnvSD2xIeg1iF5he4Q5YX0PfYA",
      authDomain: "samtech-controle-de-vendas.firebaseapp.com",
      databaseURL: "https://samtech-controle-de-vendas.firebaseio.com",
      projectId: "samtech-controle-de-vendas",
      storageBucket: "samtech-controle-de-vendas.appspot.com",
      messagingSenderId: "997655845700"  
    }),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AnexoComponentModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ManterProdutoPage,
    ManterPessoaPage,
    CameraPage,
    PessoaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MovieProvider,
    ProdutoService,
    PessoaService,
    File,
    FileOpener,
    Camera,
    HttpModule
  ]
})

export class AppModule {}
