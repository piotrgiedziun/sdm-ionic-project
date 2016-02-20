import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';


@Injectable()
export class ArticleProvider {
    constructor(@Inject(Http) http) {
        this.http = http;
    }

    load() {
        if (this.data) {
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {
            this.http.get('http://wydinfo.org/wp-json/wp/v2/sync').subscribe(res => {
                this.data = this.processData(res.json());
                resolve(this.data);
            });
        });
    }

    processData(data) {
        //@TODO

        return data;
    }

    getArticles() {
        return this.load().then(data => {
            return data.articles;
        });
    }


}