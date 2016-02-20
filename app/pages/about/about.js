import {Page} from 'ionic-framework/ionic'

@Page({
    templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
    constructor() {}

    openInfo() {
        window.open('http://stermedia.eu');
    }
    openFacebook() {
        window.open('https://www.facebook.com/stermedia/');
    }
    openTwitter() {
        window.open('https://twitter.com/stermediait');
    }
    openMail() {
        //@TODO mail
    }
}