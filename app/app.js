import {App, Platform, Events, IonicApp, Storage, SqlStorage} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';
import {HomePage} from './pages/home/home';
import {AboutPage} from './pages/about/about';
import {CategoryListPage} from './pages/category-list/category-list';

import {CategoryProvider} from './providers/category'

@App({
  templateUrl: 'build/app.html',
  providers: [CategoryProvider],
  config: {}
})
export class MyApp {
  constructor(@Inject(Platform) platform,
              @Inject(Events) events,
              @Inject(IonicApp) app)  {
    this.events = events;
    this.app = app;

    this.root = CategoryListPage;

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Categories', component: CategoryListPage},
      { title: 'About', component: AboutPage }
    ];

    platform.ready().then(() => {
      // init database
      this.storage = new Storage(SqlStorage);
      this.storage.query('CREATE TABLE IF NOT EXISTS category (id INTEGER, name TEXT)').then(() => {
        this.events.publish('db:ready');
      }, (error) => {
        this.events.publish('db:error');
        console.log('unable to create table' + JSON.stringify(error.err));
      });
    });

    this.eventsListener();
  }

  eventsListener() {
    this.events.subscribe('app:language', (parms: any) => {
      console.log('selected language', parms[0].name);
    });
  }

  openPage(page) {
    this.app.getComponent('leftMenu').close();
    let nav = this.app.getComponent('nav');

    if (page.index) {
      nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      nav.setRoot(page.component);
    }
  }
}
