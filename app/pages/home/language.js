import {Page, ViewController, Events} from 'ionic-framework/ionic'


@Page({
    templateUrl: 'build/pages/home/language.html'
})
export class LanguagePage {
    constructor(viewCtrl: ViewController,
                events: Events) {
        this.viewCtrl = viewCtrl;
        this.events = events;

        this.languages = [
            {id: 'pl', name: 'Polski'},
            {id: 'en', name: 'English'}
        ]
    }

    changeLanguage(language: any) {
        this.events.publish('app:language', language);
        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}