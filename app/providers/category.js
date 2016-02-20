import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';


@Injectable()
export class CategoryProvider {
    constructor(@Inject(Http) http) {
        this.http = http;
    }

    load() {
        if (this.data) {
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {
            this.http.get('http://wydinfo.org/wp-json/wp/v2/categories/').subscribe(res => {
                this.data = this.processData(res.json());
                resolve(this.data);
            });
        });
    }

    getCategoriesFromDb() {

    }

    processData(data) {
        // reduce data & save to db
        console.log(data);
        return data;
    }

    getCategories() {
        return this.load().then(data => {
            return data;
        });
    }


}