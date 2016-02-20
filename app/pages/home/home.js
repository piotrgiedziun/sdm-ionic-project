import {Page, IonicApp, NavController, Modal} from 'ionic-framework/ionic';
import {LanguagePage} from './language'

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(nav: NavController, app: IonicApp) {
    this.nav = nav;
    this.app = app;
  }

  changeLanguage() {
    let modal = Modal.create(LanguagePage);
    this.nav.present(modal)
  }
}
