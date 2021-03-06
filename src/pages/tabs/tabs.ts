import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { FeedPage } from '../feed/feed';
import { FirebasePage } from '../firebase/firebase';
import { CameraPage } from '../camera/camera';
import { PessoaPage } from '../pessoa/pessoa';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab0Root = CameraPage;
  tab1Root = HomePage;
  tab2Root = FeedPage;
  tab3Root = FirebasePage;
  tab4Root = PessoaPage;

  constructor() {

  }
}
