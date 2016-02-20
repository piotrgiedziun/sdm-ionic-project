import {Page} from 'ionic-framework/ionic'
import {CategoryProvider} from '../../providers/category'
import {Http} from 'angular2/http';

@Page({
    templateUrl: 'build/pages/category-list/category-list.html'
})
export class CategoryListPage {
    constructor(categoryProvider: CategoryProvider) {
        this.categoryProvider = categoryProvider;

        this.categories = [];

        this.categoryProvider.getCategoriesFromDb().then(categories => {
            console.log(categories);
            this.categories = categories;
        })
    }


}