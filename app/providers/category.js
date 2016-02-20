import {Platform, Storage, SqlStorage} from 'ionic-framework/ionic';
import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';


@Injectable()
export class CategoryProvider {
    constructor(@Inject(Platform) platform, @Inject(Http) http) {
        this.http = http;
        this.platform = platform;

        this.platform.ready().then(() => {
            console.log('platform ready');
            this.storage = new Storage(SqlStorage);
        });
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
        return new Promise(resolve => {
            this.platform.ready().then(() => {
                this.storage.query("SELECT * FROM category").then((data) => {
                    this.categories = [];

                    if(data.res.rows.length > 0) {
                        for(var i = 0; i < data.res.rows.length; i++) {
                            this.categories.push({name: data.res.rows.item(i).name});
                        }
                    }
                    console.log(this.categories);
                    resolve(this.categories);
                }, (error) => {
                    console.log("ERROR -> " + JSON.stringify(error.err));
                    resolve([]);
                });
            });
        });
    }

    processData(data) {
        // reduce data & save to db
        this.platform.ready().then(() => {
            data.forEach( item => {
                console.log(item.name);
                this.storage.query("INSERT INTO category (name) VALUES ('"+item.name+"')").then((data) => {
                    console.log(JSON.stringify(data.res));
                }, (error) => {
                    console.log("ERROR -> " + JSON.stringify(error.err));
                });
            });
        });
        return data;
    }

    getCategories() {
        return this.load().then(data => {
            return data;
        });
    }


}